import { Request, Response } from "express";
import { UsuariosModel } from "../models/usuarios.model";
import comparar from "../middlewares/comparar.contrasenas";
import { ClienteModel } from "../models/clientes.model";
import { VentasModel } from "../models/ventas.model";
import { EmpleadosModel } from "../models/empleados.model";
import { Detalle_VentaModel } from "../models/detalle_venta.model";
import encriptar from "../middlewares/encriptar.contrasenas";

import 'localstorage-polyfill';


let contrasena: any, rol: any, idUsuario: any, nombreCliente: any, nombreEmpleado: any, email: any;
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let actual: any;
if (month < 10) {
  actual = `${year}-0${month}-${day}`;
}
else {
  actual = `${year}-${month}-${day}`;
}

//Inicio de sesión:
export async function findIniciarSesion(req: Request, res: Response) {

  const { usuario, password } = req.body;


  await UsuariosModel.findOne({ where: { email: usuario } }).then(result =>
    contrasena = result?.getDataValue('password'));

  await UsuariosModel.findOne({ where: { email: usuario } }).then(result =>
    rol = result?.getDataValue('rol'));

  await UsuariosModel.findOne({ where: { email: usuario } }).then(result =>
    idUsuario = result?.getDataValue('idUsuario'));



  if (idUsuario !== undefined) {
    await ClienteModel.findOne({ where: { idUsuario: idUsuario } }).then(result =>
      nombreCliente = result?.getDataValue('nombre_C'));
    let idCliente;
    await ClienteModel.findOne({ where: { idUsuario: idUsuario } }).then(result =>
      idCliente = result?.getDataValue('idCliente'));

    localStorage.setItem('cliente', JSON.stringify(idCliente));

    await EmpleadosModel.findOne({ where: { idUsuario: idUsuario } }).then(result =>
      nombreEmpleado = result?.getDataValue('nombre_E'));
  }


  const records = await VentasModel.findAll({ raw: true, where: { fecha_Vencimiento: actual, status: "NO PAGADO" } });
  console.log(records);
  console.log(records.length);
  if (contrasena != undefined || idUsuario != undefined) {

    const comp = await comparar(password, contrasena);


    if (contrasena == password && rol === "administrador") {
      if (records.length !== 0) {
        res.render("principaladmi-view", { alert: true, alertTitle: 'BIENVENIDO A CREATIVE IDEAS', alertMessage: "BUEN DIA ADMINISTRADOR " + nombreEmpleado + ", tienes apartados vencidos. BORRALOS.", alertIcon: 'info', ruta: '/administrador' });
      } else {
        res.render("principaladmi-view", { alert: true, alertTitle: 'BIENVENIDO A CREATIVE IDEAS', alertMessage: "BUEN DIA ADMINISTRADOR " + nombreEmpleado + "", alertIcon: 'info', ruta: '/administrador' });
      }

    }

    else if (comp && rol === "cliente") {
      res.render("principalcliente-view", { alert: true, alertTitle: 'BIENVENIDO A CREATIVE IDEAS', alertMessage: "BUEN DIA " + nombreCliente + "", alertIcon: 'info', ruta: '/cliente' });
    }

    else if (comp && rol === "empleado") {
      if (records.length !== 0) {
        res.render("principalempleado-view", { alert: true, alertTitle: 'BIENVENIDO A CREATIVE IDEAS', alertMessage: "BUEN DIA VENDEDOR " + nombreEmpleado + ", tienes apartados vencidos. BORRALOS.", alertIcon: 'info', ruta: '/vendedor' });
      } else {
        res.render("principalempleado-view", { alert: true, alertTitle: 'BIENVENIDO A CREATIVE IDEAS', alertMessage: "BUEN DIA VENDEDOR " + nombreEmpleado + "", alertIcon: 'info', ruta: '/vendedor' });
      }


    }

    //Alerta inicio de sesión incorrecto:contraseña incorrecta
    else {
      res.render("iniciosesion-view", { alert: true, alertTitle: 'Inicio de sesión incorrecto', alertMessage: "contraseña incorrecta", alertIcon: 'error', ruta: '' });
    }
  }
  else {
    res.render("iniciosesion-view", { alert: true, alertTitle: 'Error', alertMessage: "Email no dado de alta en el sistema", alertIcon: 'error', ruta: '' })
  }

}


export function indexViewEditarCliente(req: Request, res: Response) {
  return res.render("view-cliente");
}

export async function getTablaCliente(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ where: { idUsuario: idUsuario }, raw: true, include: [{ model: ClienteModel, attributes: ["idCliente", "nombre_C", "num_telefono"] }], attributes: ["email"] });
  res.status(200).json(records);
}


export async function getTablaEmpleado(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ where: { idUsuario: idUsuario }, raw: true, attributes: ["email"], include: [{ model: EmpleadosModel, attributes: ["idEmpleado"], include: [{ model: VentasModel, attributes: ["fecha_Inicial"], include: [{ model: Detalle_VentaModel, attributes: ["cantidad", "precio_Total", "idProducto",] }] }] }] })
  console.log(records)
  res.status(200).json(records);

}


export async function getDatosClienteEditar(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ raw: true, where: { idUsuario } });
  res.status(200).json(records);
}


/**
 * @updateCliente
 * Funcion que actualiza los datos del cliente: contraseña
 *
 */
export async function updateCliente(req: Request, res: Response) {

  const { usuario, password, password_new, password_new_c } = req.body;

  const contraseñaA = await comparar(password, contrasena);

  if (contraseñaA) {
    if (password_new != password_new_c) {
      res.render("view-cliente", { alert: true, alertTitle: 'Error', alertMessage: "La contraseñas ingresadas no coinciden", alertIcon: 'error', ruta: '/iniciosesion/vista/editarCliente' })
    }
    else {
      const passwordHash = await encriptar(password_new);
      const response = await UsuariosModel.update({ email: usuario, password: passwordHash }, { where: { idUsuario } })
      res.render("view-cliente", { alert: true, alertTitle: "Nueva contraseña guardada", alertMessage: "", alertIcon: 'success', ruta: '/iniciosesion/vista/editarCliente' })

    }
  }
  else {
    res.render("view-cliente", { alert: true, alertTitle: 'Error', alertMessage: "La contraseña antigua ingresada es incorrecta", alertIcon: 'error', ruta: '/iniciosesion/vista/editarCliente' })
  }
}






