import { Request, Response } from "express";
import { UsuariosModel } from "../models/usuarios.model";
import comparar from "../middlewares/comparar.contrasenas";
import { ClienteModel } from "../models/clientes.model";
import { VentasModel } from "../models/ventas.model";
import { EmpleadosModel } from "../models/empleados.model";
import { Detalle_VentaModel } from "../models/detalle_venta.model";
import encriptar from "../middlewares/encriptar.contrasenas";

let contrasena: any, rol: any, idUsuario: any;

//Inicio de sesión:
export async function findIniciarSesion(req: Request, res: Response) {
  const { usuario, password } = req.body;


  await UsuariosModel.findOne({ where: { usuario: usuario } }).then(result =>
    contrasena = result?.getDataValue('password'));

  await UsuariosModel.findOne({ where: { usuario: usuario } }).then(result =>
    rol = result?.getDataValue('rol'));

  await UsuariosModel.findOne({ where: { usuario: usuario } }).then(result =>
    idUsuario = result?.getDataValue('idUsuario'));


  if (contrasena != undefined) {

    const comp = await comparar(password, contrasena);

    if (comp && rol === "empleado") {
      res.status(201).render("principalempleado-view");
    }

    else if (comp && rol === "cliente") {
      res.status(201).render("principalcliente-view");
    }

    //Alerta inicio de sesión incorrecto:contraseña incorrecta
    else {
      res.render("iniciosesion-view", { alert: true, alertTitle: 'Inicio de sesión incorrecto', alertMessage: "contraseña incorrecta", alertIcon: 'error', ruta: '' });
    }
  }
  else {
    res.render("iniciosesion-view", { alert: true, alertTitle: 'Error', alertMessage: "Usuario no registrado", alertIcon: 'error', ruta: '' })
  }

}


export function indexViewEditarCliente(req: Request, res: Response) {
  const data = { title: "Programacion Web" };
  return res.render("view-cliente");
}

export async function getTablaCliente(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ where: { idUsuario: idUsuario }, raw: true, include: [{ model: ClienteModel, attributes: ["idCliente", "nombre_C", "num_telefono"] }], attributes: ["usuario"] });
  res.status(200).json(records);

}


export async function getTablaEmpleado(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ where: { idUsuario: idUsuario }, raw: true, attributes: ["usuario"], include: [{ model: EmpleadosModel, attributes: ["idEmpleado"], include: [{ model: VentasModel, attributes: ["fecha_Inicial"], include: [{ model: Detalle_VentaModel, attributes: ["cantidad", "precio_Total", "idProducto",] }] }] }] })
  console.log(records)
  res.status(200).json(records);

}


export async function getDatosClienteEditar(req: Request, res: Response) {
  const records = await UsuariosModel.findAll({ raw: true, where: { idUsuario } });
  res.status(200).json(records);
}

export async function updateCliente(req: Request, res: Response) {
  const { usuario, password, password_new, password_new_c } = req.body;

  const contraseñaA = await comparar(password, contrasena);

  if (contraseñaA) {
    if (password_new != password_new_c) {
      res.render("view-cliente", { alert: true, alertTitle: 'Error', alertMessage: "La contraseñas ingresadas no coinciden", alertIcon: 'error', ruta: '/iniciosesion/vista/editarCliente' })
  }
    else {
      const passwordHash = await encriptar(password_new);
      const response = await UsuariosModel.update({ usuario: usuario, password: passwordHash }, { where: { idUsuario } })
       res.render("view-cliente", { alert: true, alertTitle: "Nueva contraseña guardada", alertMessage: "", alertIcon: 'success', ruta: '/iniciosesion/vista/editarCliente' })
  
    }
  }
  else {
    res.render("view-cliente", { alert: true, alertTitle: 'Error', alertMessage: "La contraseña antigua ingresada es incorrecta", alertIcon: 'error' ,ruta:'/iniciosesion/vista/editarCliente'})
  }
}




