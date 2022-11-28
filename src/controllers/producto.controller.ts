import { Request, Response } from "express";
import { ProductosModel } from "../models/productos.model";
import { ProveedoresModel } from "../models/proveedores.model";

export async function createProducto(req: Request, res: Response) {
  let { proveedor, nombre, descripcion, existencia, precio_Compra, precio_Venta, categoria } = req.body;
  let url_imagen = req.file?.filename;
  proveedor = String(proveedor.trim());
  nombre = String(nombre.trim());
  descripcion = String(descripcion.trim());

  let  idProveedor;

  const busquedaProducto=await ProductosModel.findOne({ where: { nombre: nombre } });
  const busquedaProveedor=await ProveedoresModel.findOne({ where: { empresa: proveedor } }).then(result => idProveedor = result?.getDataValue("idProveedor"));
  //await ProveedoresModel.findOne({ where: { empresa: proveedor } }).then(result => busquedaProveedor = result);

  if (busquedaProducto == null) {

    if (busquedaProveedor != null) {
      await ProductosModel.create({ idProveedor, nombre, categoria, descripcion, existencia, precio_Compra, precio_Venta, url_imagen });
      const records = await ProductosModel.findAll({ raw: true });

      res.status(201).render("registroproductos-view", {alert: true,alertTitle: 'PRODUCTO REGISTRADO',alertMessage: "",alertIcon: 'success',ruta: '/vistaRegistroProducto'});

    } else {
      res.render("registroproductos-view", {alert: true,alertTitle: 'Error',alertMessage: "PROOVEEDOR NO EXISTE",alertIcon: 'error',ruta: '/vistaRegistroProducto'});
    }


  } else {

    res.render("registroproductos-view", {alert: true,alertTitle: 'Error',alertMessage: "PRODUCTO YA EXISTE",alertIcon: 'error',ruta: '/vistaRegistroProducto'});

  }

}

export async function getProducto(req: Request, res: Response) {
  const records = await ProductosModel.findAll({ raw: true, attributes: ["idProducto", "nombre", "descripcion", "existencia", "precio_Compra", "precio_Venta", "idProveedor", "categoria", "url_imagen"] });
  res.status(200).json(records);
}

export async function getProductoById(req: Request, res: Response) {
  const { idProducto } = req.params;
  const records = await ProductosModel.findAll({ raw: true, where: { idProducto } });
  res.status(200).json(records);
}


export function vistaProductos(req: Request, res: Response) {
  return res.render("vista-productos");
}

export async function updateProducto(req: Request, res: Response) {
  let { nombre, descripcion, existencia, precio_Compra, precio_Venta } = req.body;
  nombre = String(nombre.trim());
  descripcion = String(descripcion.trim());

  let busquedaProducto;

  await ProductosModel.findOne({ where: { nombre: nombre } }).then(result =>
    busquedaProducto = result);

  console.log(busquedaProducto);
  if (busquedaProducto == null) {
    res.render("registroproductos-view", {alert: true,alertTitle: 'Error',alertMessage: "PRODUCTO NO EXISTE",alertIcon: 'error',ruta: '/modulo/producto/vistaProductos'});
  } else {
    let id;
    await ProductosModel.findOne({ where: { nombre: nombre } }).then(result =>

      id = result?.getDataValue('idProducto'));
    let url_imagen = req.file?.filename;
    if (url_imagen == null) {
      const response = await ProductosModel.update({ descripcion: descripcion, existencia: existencia, precio_Compra: precio_Compra, precio_Venta: precio_Venta }, { where: { idProducto: id } }).then(function (data) {
        const res = { success: true, data: data, message: "updated successful" }
        return res;
      }).catch(error => {
        const res = { success: false, error: error }
        return res;
      });
    } else {
      const response = await ProductosModel.update({ descripcion: descripcion, existencia: existencia, precio_Compra: precio_Compra, precio_Venta: precio_Venta, url_imagen: url_imagen }, { where: { idProducto: id } }).then(function (data) {
        const res = { success: true, data: data, message: "updated successful" }
        return res;
      }).catch(error => {
        const res = { success: false, error: error }
        return res;
      });
    }


    res.status(201).render("vista-productos", {alert: true,alertTitle: 'PRODUCTO ACTUALIZADO',alertMessage: "",alertIcon: 'success',ruta: '/modulo/producto/vistaProductos'});

  }

}