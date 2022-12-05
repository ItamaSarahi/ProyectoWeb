import { Request, Response } from "express";
import { ProductosModel } from "../models/productos.model";
import { Detalle_VentaModel } from "../models/detalle_venta.model";
import { VentasModel } from "../models/ventas.model";
import { Sequelize } from "sequelize"
import 'localstorage-polyfill';
var today = new Date();
import * as authService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";


//Obtener tabla de productos dependiendo de su categoría


//Obtener datos dependiendo la categoria:

var productos = new Array, idProductosArray = new Array, cantidadesArray = new Array, preciosTotalesArray = new Array, contador = 1;
let date = new Date();
let day = date.getDate();
let dayVencimiento = date.getDate() + 4;
let month = date.getMonth() + 1;
let year = date.getFullYear();
let actual: any, fechaVencimiento: any;

if (month < 10) {
  actual = `${year}-0${month}-${day}`;
  fechaVencimiento = `${year}-0${month}-${dayVencimiento}`;
} else {
  actual = `${year}-${month}-${day}`;
  fechaVencimiento = `${year}-${month}-${dayVencimiento}`;
}



export async function getTermos(req: Request, res: Response) {
  let categoriabusqueda = "termos"
  const records = await ProductosModel.findAll({ raw: true, where: { categoria: categoriabusqueda }, attributes: ["idProducto", "nombre", "descripcion", "precio_Venta", "url_imagen"] });

  res.status(200).json(records);
}

export async function getTuppers(req: Request, res: Response) {
  let categoriabusqueda = "tuppers"
  const records = await ProductosModel.findAll({ raw: true, where: { categoria: categoriabusqueda }, attributes: ["idProducto", "nombre", "descripcion", "precio_Venta", "url_imagen"] });
  console.log(records, "esto es tuppers");
  res.status(200).json(records);
}

export async function getCubiertos(req: Request, res: Response) {
  let categoriabusqueda = "cubiertos"
  const records = await ProductosModel.findAll({ raw: true, where: { categoria: categoriabusqueda }, attributes: ["idProducto", "nombre", "descripcion", "precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getBotellasAgua(req: Request, res: Response) {
  let categoriabusqueda = "botellas agua"
  const records = await ProductosModel.findAll({ raw: true, where: { categoria: categoriabusqueda }, attributes: ["idProducto", "nombre", "descripcion", "precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getLoncheras(req: Request, res: Response) {
  let categoriabusqueda = "loncheras"
  const records = await ProductosModel.findAll({ raw: true, where: { categoria: categoriabusqueda }, attributes: ["idProducto", "nombre", "descripcion", "precio_Venta", "url_imagen"] });
  res.status(200).json(records);
}

export async function getExtras(req: Request, res: Response) {
  let categoriabusqueda = "extras"
  const records = await ProductosModel.findAll({ raw: true, where: { categoria: categoriabusqueda }, attributes: ["idProducto", "nombre", "descripcion", "precio_Venta", "url_imagen"] });
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



export async function getProductoById(req: Request, res: Response) {
  const { idProducto } = req.params;
  const records = await ProductosModel.findAll({ raw: true, where: { idProducto } });
  res.status(200).json(records);
}

//Guardar los productos termos en el localStorage
export async function guardarProductosTermosLocalStorage(req: Request, res: Response) {

  contador++;
  try {


    let nombre: any, precioUnitario: any, cantidadActual: any, imagen: any;
    const { idProducto, cantidad } = req.params;

    if (cantidad != '0') {

      if (contador % 2 == 0) {
        await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => cantidadActual = result?.getDataValue("existencia"));
        if (parseInt(cantidad) < cantidadActual) {
          console.log("entre al if");
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => nombre = result?.getDataValue("nombre"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => precioUnitario = result?.getDataValue("precio_Venta"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => imagen = result?.getDataValue("url_imagen"));
          llenarArrayAndLocalStorage(cantidad, precioUnitario, nombre, idProducto, imagen);
          //Se hace la redirecion
          res.render("productoCliente/vistaTermo", { alert: true, alertTitle: 'AGREGADO AL CARRITO', alertMessage: "SIGUE APARTANDO", alertIcon: 'success', ruta: '/productos/vistaTermo' });
        } else {
          res.render("productoCliente/vistaTermo", { alert: true, alertTitle: '¡LO SENTIMOS!', alertMessage: "NO CONTAMOS CON ESTA CANTIDAD", alertIcon: 'error', ruta: '/productos/vistaTermo' });
        }
      }
    } else {
      res.status(200).render("productoCliente/vistaTermo", { alert: true, alertTitle: 'INGRESE UNA CANTIDAD', alertMessage: "CANTIDAD MINIMA ES 1, MAXIMO 100.", alertIcon: 'error', ruta: '/productos/vistaTermo' });
    }


  } catch (error) {
    res.status(200);
  }
}

//Guardar los productos cubiertos en el localStorage
export async function guardarProductosCubiertosLocalStorage(req: Request, res: Response) {

  contador++;
  try {
    let nombre: any, precioUnitario: any, cantidadActual: any, imagen: any;
    const { idProducto, cantidad } = req.params;

    if (cantidad != '0') {

      if (contador % 2 == 0) {
        await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => cantidadActual = result?.getDataValue("existencia"));
        if (parseInt(cantidad) < cantidadActual) {

          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => nombre = result?.getDataValue("nombre"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => precioUnitario = result?.getDataValue("precio_Venta"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => imagen = result?.getDataValue("url_imagen"));
          llenarArrayAndLocalStorage(cantidad, precioUnitario, nombre, idProducto, imagen);
          //Se hace la redirecion
          res.render("productoCliente/vistaCubiertos", { alert: true, alertTitle: 'AGREGADO AL CARRITO', alertMessage: "SIGUE APARTANDO", alertIcon: 'success', ruta: '/productos/vistaCubiertos' });
        } else {
          res.render("productoCliente/vistaCubiertos", { alert: true, alertTitle: '¡LO SENTIMOS!', alertMessage: "NO CONTAMOS CON ESTA CANTIDAD", alertIcon: 'error', ruta: '/productos/vistaCubiertos' });
        }
      }
    } else {
      res.status(200).render("productoCliente/vistaCubiertos", { alert: true, alertTitle: 'INGRESE UNA CANTIDAD', alertMessage: "CANTIDAD MINIMA ES 1, MAXIMO 100.", alertIcon: 'error', ruta: '/productos/vistaCubiertos' });
    }


  } catch (error) {
    res.status(200);
  }
}

//Guardar los productos Tuppers en el localStorage y arrays
export async function guardarProductosTuppersLocalStorage(req: Request, res: Response) {

  contador++;
  try {
    let nombre: any, precioUnitario: any, cantidadActual: any, imagen: any;
    const { idProducto, cantidad } = req.params;

    if (cantidad != '0') {

      if (contador % 2 == 0) {
        await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => cantidadActual = result?.getDataValue("existencia"));
        if (parseInt(cantidad) < cantidadActual) {

          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => nombre = result?.getDataValue("nombre"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => precioUnitario = result?.getDataValue("precio_Venta"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => imagen = result?.getDataValue("url_imagen"));
          llenarArrayAndLocalStorage(cantidad, precioUnitario, nombre, idProducto, imagen);
          //Se hace la redirecion
          res.render("productoCliente/vistaTupper", { alert: true, alertTitle: 'AGREGADO AL CARRITO', alertMessage: "SIGUE APARTANDO", alertIcon: 'success', ruta: '/productos/vistaTupper' });
        } else {
          res.render("productoCliente/vistaTupper", { alert: true, alertTitle: '¡LO SENTIMOS!', alertMessage: "NO CONTAMOS CON ESTA CANTIDAD", alertIcon: 'error', ruta: '/productos/vistaTupper' });
        }
      }
    } else {
      res.status(200).render("productoCliente/vistaTupper", { alert: true, alertTitle: 'INGRESE UNA CANTIDAD', alertMessage: "CANTIDAD MINIMA ES 1, MAXIMO 100.", alertIcon: 'error', ruta: '/productos/vistaTupper' });
    }


  } catch (error) {
    res.status(200);
  }
}

//Guardar los productos Botellas de agua en el localStorage y arrays
export async function guardarProductosBotellasLocalStorage(req: Request, res: Response) {

  contador++;
  try {
    let nombre: any, precioUnitario: any, cantidadActual: any, imagen: any;
    const { idProducto, cantidad } = req.params;

    if (cantidad != '0') {

      if (contador % 2 == 0) {
        await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => cantidadActual = result?.getDataValue("existencia"));
        if (parseInt(cantidad) < cantidadActual) {

          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => nombre = result?.getDataValue("nombre"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => precioUnitario = result?.getDataValue("precio_Venta"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => imagen = result?.getDataValue("url_imagen"));
          llenarArrayAndLocalStorage(cantidad, precioUnitario, nombre, idProducto, imagen);
          //Se hace la redirecion
          res.render("productoCliente/vistaBotellas", { alert: true, alertTitle: 'AGREGADO AL CARRITO', alertMessage: "SIGUE APARTANDO", alertIcon: 'success', ruta: '/productos/vistaBotellas' });
        } else {
          res.render("productoCliente/vistaBotellas", { alert: true, alertTitle: '¡LO SENTIMOS!', alertMessage: "NO CONTAMOS CON ESTA CANTIDAD", alertIcon: 'error', ruta: '/productos/vistaBotellas' });
        }
      }
    } else {
      res.status(200).render("productoCliente/vistaBotellas", { alert: true, alertTitle: 'INGRESE UNA CANTIDAD', alertMessage: "CANTIDAD MINIMA ES 1, MAXIMO 100.", alertIcon: 'error', ruta: '/productos/vistaBotellas' });
    }


  } catch (error) {
    res.status(200);
  }
}

//Guardar los productos Loncheras en el localStorage y arrays
export async function guardarProductosLoncherasLocalStorage(req: Request, res: Response) {

  contador++;
  try {
    let nombre: any, precioUnitario: any, cantidadActual: any, imagen: any;
    const { idProducto, cantidad } = req.params;

    if (cantidad != '0') {

      if (contador % 2 == 0) {
        await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => cantidadActual = result?.getDataValue("existencia"));
        if (parseInt(cantidad) < cantidadActual) {

          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => nombre = result?.getDataValue("nombre"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => precioUnitario = result?.getDataValue("precio_Venta"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => imagen = result?.getDataValue("url_imagen"));
          llenarArrayAndLocalStorage(cantidad, precioUnitario, nombre, idProducto, imagen);
          //Se hace la redirecion
          res.render("productoCliente/vistaLoncheras", { alert: true, alertTitle: 'AGREGADO AL CARRITO', alertMessage: "SIGUE APARTANDO", alertIcon: 'success', ruta: '/productos/vistaLoncheras' });
        } else {
          res.render("productoCliente/vistaLoncheras", { alert: true, alertTitle: '¡LO SENTIMOS!', alertMessage: "NO CONTAMOS CON ESTA CANTIDAD", alertIcon: 'error', ruta: '/productos/vistaLoncheras' });
        }
      }
    } else {
      res.status(200).render("productoCliente/vistaLoncheras", { alert: true, alertTitle: 'INGRESE UNA CANTIDAD', alertMessage: "CANTIDAD MINIMA ES 1, MAXIMO 100.", alertIcon: 'error', ruta: '/productos/vistaLoncheras' });
    }


  } catch (error) {
    res.status(200);
  }
}

//Guardar los productos Loncheras en el localStorage y arrays
export async function guardarProductosExtrasLocalStorage(req: Request, res: Response) {

  contador++;
  try {
    let nombre: any, precioUnitario: any, cantidadActual: any, imagen: any;
    const { idProducto, cantidad } = req.params;

    if (cantidad != '0') {

      if (contador % 2 == 0) {
        await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => cantidadActual = result?.getDataValue("existencia"));
        if (parseInt(cantidad) < cantidadActual) {

          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => nombre = result?.getDataValue("nombre"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => precioUnitario = result?.getDataValue("precio_Venta"));
          await ProductosModel.findOne({ where: { idProducto: idProducto } }).then(result => imagen = result?.getDataValue("url_imagen"));
          llenarArrayAndLocalStorage(cantidad, precioUnitario, nombre, idProducto, imagen);
          //Se hace la redirecion
          res.render("productoCliente/vistaExtras", { alert: true, alertTitle: 'AGREGADO AL CARRITO', alertMessage: "SIGUE APARTANDO", alertIcon: 'success', ruta: '/productos/vistaExtras' });
        } else {
          res.render("productoCliente/vistaExtras", { alert: true, alertTitle: '¡LO SENTIMOS!', alertMessage: "NO CONTAMOS CON ESTA CANTIDAD", alertIcon: 'error', ruta: '/productos/vistaExtras' });
        }
      }
    } else {
      res.status(200).render("productoCliente/vistaExtras", { alert: true, alertTitle: 'INGRESE UNA CANTIDAD', alertMessage: "CANTIDAD MINIMA ES 1, MAXIMO 100.", alertIcon: 'error', ruta: '/productos/vistaExtras' });
    }


  } catch (error) {
    res.status(200);
  }
}





export function recuperarDatos(req: Request, res: Response) {
  console.log("entre al local storage");
  if (localStorage.producto != undefined) {
    res.status(200).json(localStorage.producto);
  } else {
    res.render("productoCliente/vistaTermo", { alert: true, alertTitle: '¡CARRITO VACIO!', alertMessage: "SELECCIONA TUS PRODUCTOS", alertIcon: 'error', ruta: '/productos/vistaTermo' });
  }
}

export function vaciarCarrito(req: Request, res: Response) {
  limpiar();
  res.render("productoCliente/vistaTermo", { alert: true, alertTitle: '¡CARRITO VACIO!', alertMessage: "SELECCIONA TUS PRODUCTOS", alertIcon: 'success', ruta: '/productos/vistaTermo' });
}

export async function GenererTicket(req: Request, res: Response) {
  try {
    var idCliente = parseInt((JSON.parse(localStorage.cliente)));
  console.log("este es el id del cliente", idCliente);
  var idVenta: any, existenciaActual: any, idEmpleado = 1;

  await VentasModel.create({ fecha_Inicial: actual, fecha_Vencimiento: fechaVencimiento, idEmpleado, idCliente: idCliente }).then(result =>
    idVenta = result?.getDataValue('idVenta'));
  console.log(idVenta);
  for (let count = 0; count < idProductosArray.length; count++) {
    await ProductosModel.findOne({ where: { idProducto: idProductosArray[count] } }).then(result => existenciaActual = result?.getDataValue("existencia"));
    await Detalle_VentaModel.create({ idProducto: idProductosArray[count], cantidad: cantidadesArray[count], precio_Total: preciosTotalesArray[count], idVenta: idVenta });
    await ProductosModel.update({ existencia: (parseInt(existenciaActual as string) - cantidadesArray[count]) }, { where: { idProducto: idProductosArray[count] } });
  }
 let precioTotal=0;
  for (let count = 0; count < preciosTotalesArray.length; count++) {
    precioTotal=precioTotal+parseInt(preciosTotalesArray[count]);
  }
  console.log(precioTotal,"ES MI TOTAL");

 let emai="paulo.canser@gmail.com";

 
  

  try {
    await authService.enviarCorreo({
      emai,
      data: { idVenta: idVenta, fechaInical:actual,fechaVencimiento: fechaVencimiento,precioTotal:precioTotal},
    });
    limpiar();
    res.render("productoCliente/vistaTermo", { alert: true, alertTitle: 'TICKET ENVIADO AL CORREO!', alertMessage: "¡PAGA EN TIENDA!", alertIcon: 'success', ruta: '/productos/vistaTermo' });
  
  } catch (e) {
    const error = e as Error;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ nameError: error.name, detail: error.message });
  }
 
  
} catch (error) {
    res.render("iniciosesion-view", { alert: true, alertTitle: 'ERROR', alertMessage: "Inicia sesion de nuvo", alertIcon: 'error', ruta: '' });
    limpiar();
    return res.status(200);
  }
return res.status(200);

}
//Funcion para vaciar el local storage y los arrays
function limpiar() {
  localStorage.clear();
  productos = [];
  idProductosArray = [];
  cantidadesArray = [];
}
//Funcion para llenar los arrays u el local storage
function llenarArrayAndLocalStorage(cantidad: String, precioUnitario: String, nombre: String, idProducto: String, imagen: String) {
  let precioTotal = parseInt(cantidad as string) * parseInt(precioUnitario as string);
  //Agrego los atributos al arreglo
  productos.push(imagen);
  productos.push(nombre);
  productos.push(precioUnitario);
  productos.push(cantidad);
  productos.push(precioTotal);
  //Estos arrays son para obtener los datos por separados durante la insercion y edicion
  idProductosArray.push(parseInt(idProducto as string));
  cantidadesArray.push(parseInt(cantidad as string));
  preciosTotalesArray.push(precioTotal);

  //Se agrega el arreglo productos al localstorage
  localStorage.setItem('producto', JSON.stringify(productos));

}