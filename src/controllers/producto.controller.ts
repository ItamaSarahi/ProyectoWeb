import { Request, Response } from "express";
import doc, { page } from "pdfkit";
import { ProductosModel } from "../models/productos.model";
import { ProveedoresModel } from "../models/proveedores.model";
const PDF = require('pdfkit-construct');


export async function createProducto(req: Request, res: Response) {
  let { proveedor, nombre, descripcion, existencia, precio_Compra, precio_Venta, categoria } = req.body;
  let url_imagen = req.file?.filename;
  proveedor = String(proveedor.trim());
  nombre = String(nombre.trim());
  descripcion = String(descripcion.trim());

  let idProveedor;

  const busquedaProducto = await ProductosModel.findOne({ where: { nombre: nombre } });
  const busquedaProveedor = await ProveedoresModel.findOne({ where: { empresa: proveedor } }).then(result => idProveedor = result?.getDataValue("idProveedor"));
  //await ProveedoresModel.findOne({ where: { empresa: proveedor } }).then(result => busquedaProveedor = result);

  if (busquedaProducto == null) {

    if (busquedaProveedor != null) {
      await ProductosModel.create({ idProveedor, nombre, categoria, descripcion, existencia, precio_Compra, precio_Venta, url_imagen });
      const records = await ProductosModel.findAll({ raw: true });

      res.status(201).render("registroproductos-view", { alert: true, alertTitle: 'PRODUCTO REGISTRADO', alertMessage: "", alertIcon: 'success', ruta: '/vistaRegistroProducto' });

    } else {
      res.render("registroproductos-view", { alert: true, alertTitle: 'Error', alertMessage: "PROOVEEDOR NO EXISTE", alertIcon: 'error', ruta: '/vistaRegistroProducto' });
    }


  } else {

    res.render("registroproductos-view", { alert: true, alertTitle: 'Error', alertMessage: "PRODUCTO YA EXISTE", alertIcon: 'error', ruta: '/vistaRegistroProducto' });

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
    res.render("registroproductos-view", { alert: true, alertTitle: 'Error', alertMessage: "PRODUCTO NO EXISTE", alertIcon: 'error', ruta: '/modulo/producto/vistaProductos' });
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


    res.status(201).render("vista-productos", { alert: true, alertTitle: 'PRODUCTO ACTUALIZADO', alertMessage: "", alertIcon: 'success', ruta: '/modulo/producto/vistaProductos' });

  }

}



export async function getPDFProductos(req: Request, res: Response) {

  const doc = new PDF({ bufferPage: true });

  const fileName = `Reporte productos${Date.now()}.pdf`;
  const stream = res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-disposition': `attachment;filename=${fileName}` });


  doc.on('data', (data: any) => { stream.write(data) })
  doc.on('end', () => { stream.end() });

  const productos = await ProductosModel.findAll({ raw: true, attributes: ["nombre", "categoria", "descripcion", "existencia", "precio_Compra", "precio_Venta"] });

  const registros = productos.map((producto) => {
    const registro = {
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      existencia: producto.existencia,
      email: producto.precio_Compra,
      num_telefono: producto.precio_Venta,
    }

    return registro;
  }
  );




  doc.setDocumentHeader({ heigth: '16%' }, () => {

    doc.image("src/public/assets/img/Logo.png", 50, 15, { width: 60, heigth: 60 });

    doc.fill("#115dc8")
      .fontSize(28)
      .text("CREATIVE IDEAS", doc.header.x + 180, doc.header.y + 20);


    doc.fontSize(12).fill('#110000').text('Reporte de productos', {
      width: 250,
      align: 'center',
    });
  });


  doc.addTable([
    { key: 'nombre', label: 'Nombre', align: 'center' },
    { key: 'categoria', label: 'Categoria', align: 'center' },
    { key: 'descripcion', label: 'Descripcion', align: 'center' },
    { key: 'existencia', label: 'Existencia', align: 'center' },
    { key: 'email', label: 'Precio compra', align: 'center' },
    { key: 'num_telefono', label: 'Precio venta', align: 'center' }],
    registros, {
    border: null,
    width: "fill_body",
    striped: true,
    stripedColors: ["#719CC8", "#FFFFFF"],
    cellsPadding: 10,
    headAlign: 'center',
    headFont: "Helvetica-Bold",
  }
  );

  doc.setDocumentFooter({ height: '10%' }, () => { });


  doc.render();
  doc.end();


}




