import { Request, Response } from "express";

export function vistaSesion(req: Request, res: Response) {
  return res.render("iniciosesion-view");
}

export function permisos(req: Request, res: Response) {
  return res.render("permisos-view");
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

export function vistaRegistroProveedor(req: Request, res: Response) {
  return res.render("registroProveedor-view");
}
export function vistaProveedor(req: Request, res: Response) {
  return res.render("view-proveedor");
}


export function vistaListaClientes(req: Request, res: Response) {
  return res.render("vista-lista-clientes");
}

export function vista_Eliminar_Apartados_Administrador(req: Request, res: Response) {
  return res.render("vista-eliminarApartados-administrador");
}


//Vistas del vendedor
export function vista_Lista_productos_Vendedor(req: Request, res: Response) {
  return res.render("vista-productos-clientes");
}

export function vista_Confirmar_Ventas_Vendedor(req: Request, res: Response) {
  return res.render("confirmarVentas-vendedor");
}

export function vista_Eliminar_Apartados_Vendedor(req: Request, res: Response) {
  return res.render("vista-eliminarApartados-vendedor");
}

export function vista_Ver_Ventas(req: Request, res: Response) {
  return res.render("vista-ver-ventas");
}

//Vista cliente:carrito
export function vista_carrito(req: Request, res: Response) {
  return res.render("vista-carrito");
 }

 export function vista_Principal_Vendedor(req: Request, res: Response) {
  return res.render("principalempleado-view");
}