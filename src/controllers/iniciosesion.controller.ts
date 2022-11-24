import { Request, Response } from "express";
import { UsuariosModel } from "../models/usuarios.model";
import comparar from "../middlewares/comparar.contrasenas";
import { ClienteModel } from "../models/clientes.model";
import encriptar from "../middlewares/encriptar.contrasenas";


let contrasena: any, rol: any, idUsuario: any;

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
      res.status(201).render("principaladmi-view");
    }

    else if (comp && rol === "cliente") {
      res.status(201).render("principalcliente-view");
    }

    else {
      res.render("iniciosesion-view", {
        alert: true,
        alertTitle: 'Inicio de sesión incorrecto',
        alertMessage: "contraseña incorrecta",
        alertIcon: 'error',
        ruta: ''
      });
    }
  }



  else {
    res.render("iniciosesion-view", {
      alert: true,
      alertTitle: 'Error',
      alertMessage: "Usuario no registrado",
      alertIcon: 'error',
      ruta: ''
    })
  }

}

//AGREGADO RECIENTEMENTE:
export function indexViewCliente(req: Request, res: Response) {
  return res.render("registroCliente-view");
}


export function indexViewClientes(req: Request, res: Response) {
  const data = { title: "Programacion Web" };
  return res.render("view-cliente");
}

export async function getExampleCliente(req: Request, res: Response) {
  const records = await ClienteModel.findAll({
    where: { idUsuario: idUsuario }, raw: true,
    include: [{ model: UsuariosModel, attributes: ["usuario"] }], attributes: ["idCliente", "nombre_C", "num_telefono"]
  });
  res.status(200).json(records);
}

export async function getExampleById(req: Request, res: Response) {
  const { idCliente } = req.params;
  const records = await UsuariosModel.findAll({ raw: true, where: { idUsuario } });
  res.status(200).json(records);
}

export async function updateCliente(req: Request, res: Response) {
  let comprobarUsuario;
  const { usuario, password } = req.body;

  const passwordHash = await encriptar(password);

  await UsuariosModel.findOne({ where: { usuario: usuario,password:passwordHash } }).then(result =>
    comprobarUsuario = result?.getDataValue('usuario'));

  if(comprobarUsuario==null){
  const response = await UsuariosModel.update({ usuario: usuario, password: passwordHash }, { where: { idUsuario } })
  }
  else{
    
  }
  res.redirect("/iniciosesion/clientd");

}




