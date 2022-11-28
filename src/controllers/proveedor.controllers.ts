import { Request, Response } from "express";
import { ProveedoresModel } from "../models/proveedores.model";


export function indexViewProveedor(req: Request, res: Response) {
  return res.render("registroProveedor-view");
}

export async function createProveedor(req: Request, res: Response) {
  const { empresa, telefono } = req.body;

  console.log(empresa, telefono);
  let busqueda

  await ProveedoresModel.findOne({ where: { empresa: empresa } }).then(result =>
    busqueda = result);

  console.log(busqueda);
  if (busqueda == null) {

    await ProveedoresModel.create({ empresa, telefono });
    const records = await ProveedoresModel.findAll({ raw: true });

    
    res.status(201).render("registroProveedor-view", {alert: true,alertTitle: 'PROVEEDOR REGISTRADO',alertMessage: "",alertIcon: 'success',ruta: '/vistaRegistroProveedor'});
  } else {
    res.render("registroProveedor-view", {alert: true,alertTitle: 'Error',alertMessage: "PROVEEDOR YA EXISTE",alertIcon: 'error',ruta: '/vistaRegistroProveedor'});
  }


}

export function indexViewProveedores(req: Request, res: Response) {
  const data = { title: "Programacion Web" };
  return res.render("view-proveedor");
}

export async function getExampleProveedor(req: Request, res: Response) {
  const records = await ProveedoresModel.findAll({ raw: true, attributes: ["idProveedor", "empresa", "telefono"] });
  res.status(200).json(records);
}

export async function getExampleById(req: Request, res: Response) {
  const { idProveedor } = req.params;
  console.log("no se puede");
  const records = await ProveedoresModel.findAll({ raw: true, where: { idProveedor } });
  res.status(200).json(records);
}


export async function deleteId(req: Request, res: Response) {
  const { idProveedor } = req.params;
  const entity = await ProveedoresModel.findByPk(idProveedor);
  await entity?.destroy();
  res.status(204).json({ ok: "" });
}

export async function updateProveedor(req: Request, res: Response) {
  const { empresa, telefono } = req.body;
  console.log(empresa);

  let busqueda;

  await ProveedoresModel.findOne({ where: { empresa: empresa } }).then(result =>
    busqueda = result);

  console.log(busqueda);
  if (busqueda == null) {
    res.send("NO EXISTE ESTE PROVEEDOR");
  } else {
    let id;
    await ProveedoresModel.findOne({ where: { empresa: empresa } }).then(result =>

      id = result?.getDataValue('idProveedor'));

    const responde = await ProveedoresModel.update({ telefono: telefono }, { where: { idProveedor: id } }).then(function (data) {
      const res = { success: true, data: data, message: "updated successful" }
      return res;
    }).catch(error => {
      const res = { success: false, error: error }
      return res;
    });
    console.log(id);


    //Ruta para visualizar tabla
    res.redirect("/catalogo/proveedor/proved");
  }

}


