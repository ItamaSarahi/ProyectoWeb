import { Request, Response } from "express";
import { ClienteModel } from "../models/clientes.model";
import { UsuariosModel } from "../models/usuarios.model";
import encriptar from "../middlewares/encriptar.contrasenas";
const PDF = require('pdfkit-construct');
import * as authService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";


/**
 * Funcion que permite la creción de clientes en la BD.
 * @encriptar
 * Encriptacion de contraseña
 */

export async function createCliente(req: Request, res: Response) {

  let idUsuario, rol, comprobarTelefono, comprobarEmail, usuarioResponse;

  try {
    const { nombre_C, apellidoPC, apellidoMC, fechaNacimiento, email, num_telefono, password } = req.body;

    const passwordHash = await encriptar(password);

    rol = "cliente";

    await UsuariosModel.findOne({ where: { email: email } }).then(result => comprobarEmail = result?.getDataValue('email'));

    await ClienteModel.findOne({ where: { num_telefono: num_telefono } }).then(result => comprobarTelefono = result?.getDataValue('num_telefono'));

    //comprobar si el usuario y el telefono ya estan registrados
    if (comprobarEmail == null) {

      if (comprobarTelefono == null) {

        await UsuariosModel.create({ email: email, password: passwordHash, rol: rol }).then(result => idUsuario = result.getDataValue('idUsuario'));

        await ClienteModel.create({ nombre_C, apellidoPC, apellidoMC, fechaNacimiento, num_telefono, idUsuario });

        await UsuariosModel.findOne({ where: { email: email } }).then(result => usuarioResponse = result?.getDataValue('email'));


        const emai = usuarioResponse;

        try {
          await authService.sendUserCredentials({
            emai,
            data: { correo: emai, contrasenia: password },
          });
          res.status(201).render("registroclientes-view", { alert: true, alertTitle: 'Usuario creado con exito', alertMessage: "", alertIcon: 'success', ruta: '/registro' });

        } catch (e) {
          const error = e as Error;
          res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
        }

      }


      //alterta numero ya registrado:
      else {
        res.render("registroclientes-view", { alert: true, alertTitle: 'Error', alertMessage: "Numero telefónico ya registrado", alertIcon: 'error', ruta: '/registro' })
      };
    }

    else {
      //alerta nombre de usuario ya registrado:
      res.render("registroclientes-view", { alert: true, alertTitle: 'Error', alertMessage: "Email ya registrado", alertIcon: 'error', ruta: '/registro' });
    }
  } catch (error) {
    res.status(200);
  }
}




/**
 * Funcion que obtiene los atributos del modelo Cliente
 *@getClientes
 */
export async function getClientes(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ where: { rol: "cliente" }, raw: true, include: [{ model: ClienteModel, attributes: ["idCliente", "nombre_C", "apellidoPC", "apellidoMC", "fechaNacimiento", "num_telefono"] }], attributes: ["email"] });
  res.status(200).json(records);
}


/**
 * Funcion que genera el PDF de los clientes registrados en el sistema
 *@map
 *Funcion que permite recorrer la tabla clientes
 */
export async function getPDFClientes(req: Request, res: Response) {

  const doc = new PDF({ bufferPages: true });
  const fileName = `Factura${Date.now()}.pdf`;
  const stream = res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-disposition': `attachment;filename=${fileName}` });

  doc.on('data', (data: any) => { stream.write(data) })
  doc.on('end', () => { stream.end() });

  const clientes = await UsuariosModel.findAll({ raw: true,nest:true, where:{rol:"cliente"},include:{model:ClienteModel, attributes:["idCliente", "nombre_C", "apellidoPC", "apellidoMC", "fechaNacimiento", "num_telefono", "idUsuario"]} });
  
  const registros = clientes.map((cliente) => {
    const registro = {
      id: cliente.ClienteModel.idCliente,
      nombre: cliente.ClienteModel.nombre_C,
      apellidoM: cliente.ClienteModel.apellidoPC,
      apellidoP: cliente.ClienteModel.apellidoPC,
      fechaNacimiento: cliente.ClienteModel.fechaNacimiento,
      email: cliente.email,
      num_telefono: cliente.ClienteModel.num_telefono,
      idUsu: cliente.ClienteModel.idUsuario,
    }

    console.log(registro);
    return registro;
  });

  doc.setDocumentHeader({}, () => {

    doc.image("src/public/assets/img/Logo.png", 50, 15, { width: 60, heigth: 60 });


    doc.fill("#115dc8")
      .fontSize(28)
      .text("CREATIVE IDEAS", doc.header.x + 180, doc.header.y + 20);

    doc.fontSize(12).fill('#110000').text('Reporte de clientes registrados en el sistema', {
      width: 250,
      align: 'center',
    });
  });

  doc.addTable([
    { key: 'id', label: '#', align: 'center' },
    { key: 'nombre', label: 'Nombre', align: 'center' },
    { key: 'apellidoM', label: 'Apellido materno', align: 'center' },
    { key: 'apellidoP', label: 'Apellido paterno', align: 'center' },
    { key: 'fechaNacimiento', label: 'Fecha Nacimiento', align: 'center' },
    { key: 'email', label: 'Email', align: 'center' },
    { key: 'num_telefono', label: 'Numero telefónico', align: 'center' },
    { key: 'idUsu', label: 'id Usuario', align: 'center' }],

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





