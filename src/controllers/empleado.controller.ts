import { Request, Response } from "express";
import { EmpleadosModel } from "../models/empleados.model";
import { UsuariosModel } from "../models/usuarios.model";
import encriptar from "../middlewares/encriptar.contrasenas";
import * as authService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

const PDF = require('pdfkit-construct');


//Creación de empleado: 
export async function createEmpleado(req: Request, res: Response) {
  const { nombre_E, apellidoPE, apellidoME, nivelEstudio, usuario, password,rol } = req.body;

  //encriptación de contraseña:
  const passwordHash = await encriptar(password);
  let idUsuario, comprobarUsuario;


  await UsuariosModel.findOne({ where: { email: usuario } }).then(result =>
    comprobarUsuario = result?.getDataValue('email'));

  //comprobar si el usuario ya existe:
  if (comprobarUsuario == null) {

    //crear empleado
    await UsuariosModel.create({ email: usuario, password: passwordHash, rol: rol }).then(result =>
      idUsuario = result.getDataValue('idUsuario'));
      let email:any;
      await UsuariosModel.findOne({ where: { idUsuario: idUsuario } }).then(result => email = result?.getDataValue('email'));
    //crear usuario
    await EmpleadosModel.create({ nombre_E, apellidoPE, apellidoME, nivelEstudio, idUsuario });
    let emai=email;
    try {
      await authService.sendUserCredentials({
        emai,
        data: { correo: usuario, contrasenia: password },
      });
      res.status(201).render("registroempleado-view", { alert: true, alertTitle: 'Empleado creado con exito', alertMessage: "", alertIcon: 'success', ruta: '/catalogo/empleado/viewRegistroEmpleado' });

    } catch (e) {
      const error = e as Error;
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
    }

    res.status(201).render("registroempleado-view", { alert: true, alertTitle: 'Empleado creado con exito', alertMessage: "", alertIcon: 'success', ruta: '/catalogo/empleado/viewRegistroEmpleado' });

  }

  
  //alerta de error: nombre ya registrado
  else {
    res.render("registroempleado-view", {
      alert: true, alertTitle: 'Error', alertMessage: "Email ya dado de alta en el sistema", alertIcon: 'error',ruta:'/catalogo/empleado/viewRegistroEmpleado',
    })
  }



}

//vista ver tabla de empleados:
export function indexViewVerEmpleados(req: Request, res: Response) {
  return res.render("view-empleado");
}

//Vista del registro empleado
export function indexViewRegistroEmpleado(req: Request, res: Response) {
  return res.render("registroempleado-view");
}


//Obtener los datos del empleado a editar mediante el id
export async function getEmpleadoEditar(req: Request, res: Response) {
  const { idEmpleado } = req.params;
  const records = await EmpleadosModel.findAll({ raw: true, where: { idEmpleado: idEmpleado } });
  res.status(200).json(records);
}


//Actualizar un empleado mediante el id:
export async function updateEmpleado(req: Request, res: Response) {

  const { nombre_E, email, nivelEstudio } = req.body;
  let busqueda, id;

  await EmpleadosModel.findOne({ where: { nombre_E: nombre_E } }).then(result => busqueda = result);

  if (busqueda == null) { res.render("view-empleado", { alert: true, alertTitle: 'Error', alertMessage: "EL EMPLEADO NO EXISTE", alertIcon: 'error', }) }

  else {

    await EmpleadosModel.findOne({ where: { nombre_E: nombre_E } }).then(result => id = result?.getDataValue('idEmpleado'));

    const response = await EmpleadosModel.update({ nombre_E: nombre_E, nivelEstudio: nivelEstudio }, { where: { idEmpleado: id } }).then(function (data) {
      const res = { success: true, data: data, message: "updated successful" }
      return res;

    }).catch(error => {
      const res = { success: false, error: error }
      return res;
    });

    //Ruta para visualizar tabla
    res.redirect("/catalogo/empleado/verEmpleados");
  }

}

//Obtener datos de la tabla empleado:
export async function getTablaEmpleado(req: Request, res: Response) {
  const records = await EmpleadosModel.findAll({ raw: true, attributes: ["idEmpleado", "nombre_E", "apellidoPE", "apellidoME",  "nivelEstudio"] });
  res.status(200).json(records);
}

//Eliminar un empleado mediante el ID:
export async function deleteEmpleado(req: Request, res: Response) {
  const { idEmpleado } = req.params;
  const entity = await EmpleadosModel.findByPk(idEmpleado);
  await entity?.destroy();
  res.status(204).json({ ok: "" });
}


export async function getFactura(req: Request, res: Response) {

  const doc = new PDF({ bufferPages: true });

  const fileName = `Reporte-empleados${Date.now()}.pdf`;
  const stream = res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-disposition': `attachment;filename=${fileName}` });

  doc.on('data', (data: any) => { stream.write(data) })
  doc.on('end', () => { stream.end() });

  const usu = await UsuariosModel.findAll({ raw: true,nest:true, where:{rol:"empleado"},include:{model:EmpleadosModel, attributes:["idEmpleado", "nombre_E", "apellidoPE", "apellidoME", "nivelEstudio", "idUsuario"]} });
  
  const registros = usu.map((empleado) => {
    const registro = {
      id: empleado.EmpleadosModel.idEmpleado,
      nombre: empleado.EmpleadosModel.nombre_E,
      apellidoM: empleado.EmpleadosModel.apellidoPE,
      apellidoP: empleado.EmpleadosModel.apellidoME,
      email: empleado.email,
      estudio: empleado.EmpleadosModel.nivelEstudio,
    }
    return registro;
  });

  doc.setDocumentHeader({}, () => {

    doc.image("src/public/assets/img/Logo.png", 50, 15, { width: 60, heigth: 60 });


    doc.fill("#115dc8")
      .fontSize(28)
      .text("CREATIVE IDEAS", doc.header.x + 180, doc.header.y + 20);

    doc.fontSize(12).fill('#110000').text('Reporte de empleados', {
      width: 250,
      align: 'center',
    });
  });



  doc.addTable([
    { key: 'id', label: '#', align: 'center' },
    { key: 'nombre', label: 'Nombre', align: 'center' },
    { key: 'apellidoM', label: 'Apellido materno', align: 'center' },
    { key: 'apellidoP', label: 'Apellido paterno', align: 'center' },
    { key: 'email', label: 'Email', align: 'center' },
    { key: 'estudio', label: 'Estudios', align: 'center' }],

    registros, {
    border: null,
    width: "fill_body",
    striped: true,
    stripedColors: ["#719CC8", "#FFFFFF"],
    cellsPadding: 7,
    marginLeft: 30,
    marginRight: 30,
    headAlign: 'center',
    headFont: "Helvetica-Bold",
  });

  doc.setDocumentFooter({ height: '10%' }, () => { });

  doc.render();

  doc.end();

}