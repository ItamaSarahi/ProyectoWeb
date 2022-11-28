import { Request, Response } from "express";
import { ProductosModel } from "../models/productos.model";
//Obtener tabla de productos dependiendo de su categoría


//Obtener datos dependiendo la categoria:

export async function getTermos(req: Request, res: Response) {
  let categoriabusqueda="TERMOS"
  const records = await ProductosModel.findAll({ raw: true,where: {categoria:categoriabusqueda}, attributes: [ "nombre", "descripcion","precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getTuppers(req: Request, res: Response) {
  let categoriabusqueda="tuppers"
  const records = await ProductosModel.findAll({ raw: true,where: {categoria:categoriabusqueda}, attributes: [ "nombre", "descripcion","precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getCubiertos(req: Request, res: Response) {
  let categoriabusqueda="cubiertos"
  const records = await ProductosModel.findAll({ raw: true,where: {categoria:categoriabusqueda}, attributes: [ "nombre", "descripcion","precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getBotellasAgua(req: Request, res: Response) {
  let categoriabusqueda="botellas agua"
  const records = await ProductosModel.findAll({ raw: true,where: {categoria:categoriabusqueda}, attributes: [ "nombre", "descripcion","precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getLoncheras(req: Request, res: Response) {
  let categoriabusqueda="loncheras"
  const records = await ProductosModel.findAll({ raw: true,where: {categoria:categoriabusqueda}, attributes: [ "nombre", "descripcion","precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getExtras(req: Request, res: Response) {
  let categoriabusqueda="extras"
  const records = await ProductosModel.findAll({ raw: true,where: {categoria:categoriabusqueda}, attributes: [ "nombre", "descripcion","precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}


//Vista termo:
export function vistaTermo(req: Request, res: Response) {
  return res.render("productoCliente/vistaTermo");
}

//Vista tupper:
export function vistaTupper(req: Request, res: Response) {
  return res.render("productoCliente/vistaTupper");
}

//Vista cubiertos:
export function vistaCubiertos(req: Request, res: Response) {
  return res.render("productoCliente/vistaCubiertos");
}

//Vista botellas:
export function vistaBotellas(req: Request, res: Response) {
  return res.render("productoCliente/vistaBotellas");
}

//Vista loncheras:
export function vistaLoncheras(req: Request, res: Response) {
  return res.render("productoCliente/vistaLoncheras");
}

//Vista extras:
export function vistaExtras(req: Request, res: Response) {
  return res.render("productoCliente/vistaExtras");
}


