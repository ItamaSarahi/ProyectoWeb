import { Request, Response } from "express";
import { EmpleadosModel } from "../models/empleados.model";
import { UsuariosModel } from "../models/usuarios.model";
import encriptar from "../middlewares/encriptar.contrasenas";
import PDF from 'pdfkit-construct';





//Creación de empleado: 
export async function createEmpleado(req: Request, res: Response) {
  const { nombre_E, apellidoPE, apellidoME, email, nivelEstudio, usuario, password } = req.body;

  //encriptación de contraseña:
  const passwordHash = await encriptar(password);
  let idUsuario, comprobarUsuario, rol;

  //asignación rol empleado:
  rol = "empleado"

  await UsuariosModel.findOne({ where: { usuario: usuario } }).then(result =>
    comprobarUsuario = result?.getDataValue('usuario'));

  //comprobar si el usuario ya existe:
  if (comprobarUsuario == null) {

      
  const doc = new PDF({bufferPages: true});

  const fileName= `Factura${Date.now()}.pdf`;
  const stream= res.writeHead(200,{'Content-Type': 'application/pdf', 'Content-disposition': `attachment;filename=${fileName}`});

  doc.on('data',(data=>{stream.write(data)}))
  doc.on('end',()=>{stream.end()});
  doc.text('Hola mundo con PDF kit',30,30);
  doc.addTable([
  ])
  doc.end();

    //crear empleado
    await UsuariosModel.create({ usuario: usuario, password: passwordHash, rol: rol }).then(result =>
    idUsuario = result.getDataValue('idUsuario'));
    //crear usuario
    await EmpleadosModel.create({ nombre_E, apellidoPE, apellidoME, email, nivelEstudio, idUsuario });
    res.status(201).render("registroempleado-view");
  }

  //alerta de error: nombre ya registrado
  else {
    res.render("registroempleado-view", {
      alert: true, alertTitle: 'Error', alertMessage: "Nombre de usuario ya registrado", alertIcon: 'error',
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

    const response = await EmpleadosModel.update({ nombre_E: nombre_E, email: email, nivelEstudio: nivelEstudio }, { where: { idEmpleado: id } }).then(function (data) {
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
  const records = await EmpleadosModel.findAll({ raw: true, attributes: ["idEmpleado", "nombre_E", "apellidoPE", "apellidoME", "email", "nivelEstudio"] });
  res.status(200).json(records);
}

//Eliminar un empleado mediante el ID:
export async function deleteEmpleado(req: Request, res: Response) {
  const { idEmpleado } = req.params;
  const entity = await EmpleadosModel.findByPk(idEmpleado);
  await entity?.destroy();
  res.status(204).json({ ok: "" });
}


