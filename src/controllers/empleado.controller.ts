import { Request, Response } from "express";
import { EmpleadosModel } from "../models/empleados.model";
import { UsuariosModel } from "../models/usuarios.model";
import encriptar from "../middlewares/encriptar.contrasenas";

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

    await UsuariosModel.create({ usuario: usuario, password: passwordHash, rol: rol }).then(result =>
      idUsuario = result.getDataValue('idUsuario'));


    await EmpleadosModel.create({ nombre_E, apellidoPE, apellidoME, email, nivelEstudio, idUsuario });
    res.status(201).render("registroempleado-view");
  }

  //alerta de error: nombre ya registrado
  else {
    res.render("registroempleado-view", {
      alert: true,
      alertTitle: 'Error',
      alertMessage: "Nombre de usuario ya registrado",
      alertIcon: 'error',
    })
  }
}

export function indexViewEmpleados(req: Request, res: Response) {
  return res.render("view-empleado");
}

export function indexViewEmpleado(req: Request, res: Response) {
  return res.render("registroempleado-view");
}


export async function getExampleById(req: Request, res: Response) {
  const { idEmpleado } = req.params;
  const records = await EmpleadosModel.findAll({ raw: true, where: { idEmpleado: idEmpleado } });
  res.status(200).json(records);
}

export async function updateEmpleado(req: Request, res: Response) {
  const { nombre_E, email, nivelEstudio } = req.body;

  let busqueda;

  await EmpleadosModel.findOne({ where: { nombre_E: nombre_E } }).then(result =>
    busqueda = result);

  if (busqueda == null) {
    res.render("view-empleado", {
      alert: true,
      alertTitle: 'Error',
      alertMessage: "No se puede modificar el nombre",
      alertIcon: 'error',
    })

  }
  else {
    let id;
    await EmpleadosModel.findOne({ where: { nombre_E: nombre_E } }).then(result =>

      id = result?.getDataValue('idEmpleado'));

    const responde = await EmpleadosModel.update({ nombre_E: nombre_E, email: email, nivelEstudio: nivelEstudio }, { where: { idEmpleado: id } }).then(function (data) {
      const res = { success: true, data: data, message: "updated successful" }
      return res;
    }).catch(error => {
      const res = { success: false, error: error }
      return res;
    });
    console.log(id);


    //Ruta para visualizar tabla
    res.redirect("/catalogo/empleado/ver");
  }

}
export async function getExampleEmpleado(req: Request, res: Response) {
  const records = await EmpleadosModel.findAll({ raw: true, attributes: ["idEmpleado", "nombre_E", "apellidoPE", "apellidoME", "email", "nivelEstudio"] });
  res.status(200).json(records);
}


export async function deleteId(req: Request, res: Response) {
  const { idEmpleado } = req.params;
  const entity = await EmpleadosModel.findByPk(idEmpleado);
  await entity?.destroy();
  res.status(204).json({ ok: "" });

}


