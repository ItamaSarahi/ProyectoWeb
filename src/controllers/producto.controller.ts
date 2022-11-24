import { Request, Response } from "express";
import { ProductosModel } from "../models/productos.model";

export async function createProducto(req: Request, res: Response) {
  const { idProveedor, nombre, descripcion, existencia, precio_Compra, precio_Venta, categoria } = req.body;
  let url_imagen = req.file?.filename;
  let busqueda;
  
  await ProductosModel.findOne({ where: { nombre: nombre } }).then(result =>busqueda = result);

  if (busqueda == null) {
    await ProductosModel.create({ idProveedor, nombre, categoria, descripcion, existencia, precio_Compra, precio_Venta, url_imagen });
    const records = await ProductosModel.findAll({ raw: true });

    const data = {
      httpCode: 201,
      message: "Registrado correctamente",
      records: records
    };


    res.status(201).render("registroproductos-view", data);
  } else {
    
    res.send("Ya existe el producto");
  }

}

export async function getExampleProducto(req: Request, res: Response) {
  const records = await ProductosModel.findAll({ raw: true, attributes: ["idProducto", "nombre", "descripcion", "existencia", "precio_Compra", "precio_Venta", "idProveedor", "categoria"] });
  res.status(200).json(records);
}

export async function getExampleById(req: Request, res: Response) {
  const { idProducto } = req.params;
  console.log("no se puede");
  const records = await ProductosModel.findAll({ raw: true, where: { idProducto } });
  res.status(200).json(records);
}


export function indexViewProductos(req: Request, res: Response) {
  const data = { title: "Programacion Web" };
  return res.render("vista-productos");
}

export async function updateProducto(req: Request, res: Response) {
 const { nombre, descripcion, existencia, precio_Compra, precio_Venta } = req.body;
  console.log(nombre);
  let busqueda;
  
  await ProductosModel.findOne({ where: { nombre:nombre } }).then(result =>
    busqueda = result);

  console.log(busqueda);
  if (busqueda == null) {
   res.send("NO EXISTE ESTE PRODUCTO");
  } else {
    let id;
    await ProductosModel.findOne({ where: { nombre: nombre } }).then(result =>
    
    id =  result?.getDataValue('idProducto'));

    const response=await ProductosModel.update({descripcion:descripcion,existencia:existencia,precio_Compra:precio_Compra,precio_Venta:precio_Venta},{where:{idProducto:id}}).then(function(data){const res = { success: true, data: data, message:"updated successful" }
    return res;}).catch(error=>{
      const res = { success: false, error: error }
      return res;
    });
    
    const entity = await ProductosModel.findByPk(id);
    res.redirect("/catalogo/producto/producte");
  }

}