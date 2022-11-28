import { Request, Response } from "express";
import { ClienteModel } from "../models/clientes.model";
import { UsuariosModel } from "../models/usuarios.model";
import encriptar from "../middlewares/encriptar.contrasenas";


//Creación del cliente:
export async function createCliente(req: Request, res: Response) {
  const { nombre_C, apellidoPC, apellidoMC, fechaNacimiento, email, num_telefono, usuario, password } = req.body;
  //encriptación de contraseña:
  const passwordHash = await encriptar(password);
  let idUsuario, rol, comprobarUsuario, comprobarTelefono;

  //asignación de rol
  rol = "cliente";

  await UsuariosModel.findOne({ where: { usuario: usuario } }).then(result =>
    comprobarUsuario = result?.getDataValue('usuario'));

  await ClienteModel.findOne({ where: { num_telefono: num_telefono } }).then(result =>
    comprobarTelefono = result?.getDataValue('num_telefono'));

  //comprobar si el usuario y el telefono ya estan registrados
  if (comprobarUsuario == null) {
    if (comprobarTelefono == null) {
      await UsuariosModel.create({ usuario: usuario, password: passwordHash, rol: rol }).then(result =>
        idUsuario = result.getDataValue('idUsuario'));

      await ClienteModel.create({ nombre_C, apellidoPC, apellidoMC, fechaNacimiento, email, num_telefono, idUsuario });
      //alerta usuario creado con exito:
      res.status(201).render("registroclientes-view", { alert: true, alertTitle: 'Usuario creado con exito', alertMessage: "", alertIcon: 'success', });
    }
    //alterta numero ya registrado:
    else {
      res.render("registroclientes-view", { alert: true, alertTitle: 'Error', alertMessage: "Numero telefónico ya registrado", alertIcon: 'error', })
    };
  }

  else {
    //alerta nombre de usuario ya registrado:
    res.render("registroclientes-view", { alert: true, alertTitle: 'Error', alertMessage: "Nombre de usuario ya registrado", alertIcon: 'error', });
  }
}

export async function getClientes(req: Request, res: Response) {
 const records = await UsuariosModel.findAll({where: { rol:"cliente" },raw:true,include:[{model:ClienteModel,attributes:["idCliente", "nombre_C","apellidoPC","apellidoMC","fechaNacimiento","email", "num_telefono"]}],attributes:["usuario"]});
  res.status(200).json(records);
}






