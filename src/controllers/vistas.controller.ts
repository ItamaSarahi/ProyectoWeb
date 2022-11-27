import { Request, Response } from "express";

export function vistaSesion(req: Request, res: Response) {
  return res.render("iniciosesion-view");
}

export function vistaRegistroClientes(req: Request, res: Response){
  return res.render("registroclientes-view")
}

export function vistaAdministrador(req: Request, res: Response){
  return res.render("principaladmi-view")
}

export function vistaCliente(req: Request, res: Response){
  return res.render("principalcliente-view")
}

export function vistaRegistroEmpleado(req: Request, res: Response){
  return res.render("registroempleado-view")
}

export function vistaRegistroProducto(req: Request, res: Response) {
  return res.render("registroproductos-view");
}

export function vistaPrincipal(req: Request, res: Response) {
  return res.render("iniciosesion-view");
}

export function vistaConfirmarVentas(req: Request, res: Response) {
  return res.render("confirmarVentas-view");
}

export function vistaApartados(req: Request, res: Response) {
  return res.render("vista-ventas");
}

export function vistaVentas(req: Request, res: Response) {
  return res.render("vista-detalleventas");
}
export function vistaRegistroCompras(req: Request, res: Response) {
  return res.render("registrocompras");
}
export function vistaCompras(req: Request, res: Response) {
  return res.render("vista-compras");
}

