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

/**
 * Funcion que permite inciar sesión al usuario ingresar y dependiendo de su rol les asigna los permisos necesarios:
 * 
 */
export async function findIniciarSesion(req: Request, res: Response) {

  const { usuario, password } = req.body;
  let idCliente;

  await UsuariosModel.findOne({ where: { email: usuario } }).then(result => contrasena = result?.getDataValue('password'));

  await UsuariosModel.findOne({ where: { email: usuario } }).then(result => rol = result?.getDataValue('rol'));

  await UsuariosModel.findOne({ where: { email: usuario } }).then(result => idUsuario = result?.getDataValue('idUsuario'));


  if (idUsuario !== undefined) {
    await ClienteModel.findOne({ where: { idUsuario: idUsuario } }).then(result => nombreCliente = result?.getDataValue('nombre_C'));

    await ClienteModel.findOne({ where: { idUsuario: idUsuario } }).then(result => idCliente = result?.getDataValue('idCliente'));

    localStorage.setItem('cliente', JSON.stringify(idCliente));

    await EmpleadosModel.findOne({ where: { idUsuario: idUsuario } }).then(result => nombreEmpleado = result?.getDataValue('nombre_E'));
  }


  const records = await VentasModel.findAll({ raw: true, where: { fecha_Vencimiento: actual, status: "NO PAGADO" } });

  const usuarioResponse = await UsuariosModel.findOne({ attributes: ["idUsuario", "email", "password", "rol"], where: { email: usuario } });


  if (contrasena != undefined || idUsuario != undefined) {

    const comp = await comparar(password, contrasena);

    if (comp && usuarioResponse !== null) {

      const user = usuarioResponse.toJSON();

      req.session.user = user;

      return res.redirect("/permisos");

    }

    else {
      res.render("iniciosesion-view", { alert: true, alertTitle: 'Inicio de sesión incorrecto', alertMessage: "contraseña incorrecta", alertIcon: 'error', ruta: '' });
    }

  }

  else {
    res.render("iniciosesion-view", { alert: true, alertTitle: 'Error', alertMessage: "Email no dado de alta en el sistema", alertIcon: 'error', ruta: '' })
  }

}


/**
 * Funcion que obtiene la vista principal del cliente
 * 
 */
export function indexViewEditarCliente(req: Request, res: Response) {
  return res.render("view-cliente");
}


/**
 * Funcion para obtener los datos del cliente
 * 
 */
export async function getTablaCliente(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ where: { idUsuario: idUsuario }, raw: true, include: [{ model: ClienteModel, attributes: ["idCliente", "nombre_C", "num_telefono"] }], attributes: ["email"] });
  res.status(200).json(records);
}

/**
 * Funcion para obtener los datos del empleado
 * 
 */
export async function getTablaEmpleado(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ where: { idUsuario: idUsuario }, raw: true, attributes: ["email"], include: [{ model: EmpleadosModel, attributes: ["idEmpleado"], include: [{ model: VentasModel, attributes: ["fecha_Inicial"], include: [{ model: Detalle_VentaModel, attributes: ["cantidad", "precio_Total", "idProducto",] }] }] }] })
  res.status(200).json(records);

}


/**
 * Funcion que permite editar al cliente por su idUsuario
 * 
 */
export async function getDatosClienteEditar(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ raw: true, where: { idUsuario } });
  res.status(200).json(records);
}


/**
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






