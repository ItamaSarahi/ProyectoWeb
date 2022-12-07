import { Request, Response } from "express";
import { ComprasModel } from "../models/compra.model";
import { Detalle_CompraModel } from "../models/detalle_compra.model";
import { ProductosModel } from "../models/productos.model";
import { ProveedoresModel } from "../models/proveedores.model";

import { Op, Sequelize } from "sequelize";
const PDF = require('pdfkit-construct');
let numero = 0;
var today = new Date();

export async function createCompra(req: Request, res: Response) {
  let { producto, cantidad, proveedor } = req.body;
  //Trim para eliminar los espacios
  producto = String(producto.trim());
  proveedor = String(proveedor.trim());
  cantidad = parseInt(cantidad);

  let busquedaProducto, busquedaProveedor, idProveedor;
  //Con esto se busca un producto
  let idProducto;
  busquedaProducto = await ProductosModel.findOne({ where: { nombre: producto } }).then(result =>
    idProducto = result?.getDataValue("idProducto"));

  let cantidadProductoActual;
  busquedaProducto = await ProductosModel.findOne({ where: { nombre: producto } }).then(result =>
    cantidadProductoActual = result?.getDataValue("existencia"));
  //Con esto busca el proveedor
  busquedaProveedor = await ProveedoresModel.findOne({ where: { empresa: proveedor } }).then(result =>
    idProveedor = result?.getDataValue("idProveedor"));
  //Variable para sumarle la cantidad
  let existencia = parseInt(cantidadProductoActual as any as string) + cantidad;


  if (busquedaProducto != null) {

    if (busquedaProveedor != null) {
      let idCompra;
      await ComprasModel.create({ idProveedor }).then(result =>
        idCompra = result.getDataValue("idCompra")
      );
      await Detalle_CompraModel.create({ idProducto, cantidad, idCompra });


      const responde = await ProductosModel.update({ existencia: existencia }, { where: { idProducto: idProducto } }).then(function (data) {
        const res = { success: true, data: data, message: "Producto actualizado" }
        return res;
      }).catch(error => {
        const res = { success: false, error: error }
        return res;
      });

      res.status(201).render("registrocompras", { alert: true, alertTitle: 'COMPRA REGISTRADA', alertMessage: "", alertIcon: 'success', ruta: '/registroCompras' });

    } else {
      res.render("registrocompras", { alert: true, alertTitle: 'Error', alertMessage: "PROVEEDOR NO EXISTE", alertIcon: 'error', ruta: '/registroCompras' });
    }


  } else {
    res.render("registrocompras", { alert: true, alertTitle: 'Error', alertMessage: "PRODUCTO NO EXISTE", alertIcon: 'error', ruta: '/registroCompras' });

  }

}

export async function getCompras(req: Request, res: Response) {
  const records = await Detalle_CompraModel.findAll({ raw: true, attributes: ["idCompra", "idProducto", "cantidad"] });
  res.status(200).json(records);
}


export async function getPDFCompras(req: Request, res: Response) {

  const doc = new PDF({ bufferPage: true });
  const { ini, fin } = req.body;
  let startedDate = new Date(ini);
  let endDate = new Date(fin);


  const fileName = `Reporte compras${Date.now()}.pdf`;
  const stream = res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-disposition': `attachment;filename=${fileName}` });

  doc.on('data', (data: any) => { stream.write(data) })
  doc.on('end', () => { stream.end() });


  const records = await ProductosModel.findAll({
    raw: true, nest: true, include: [{
      model: Detalle_CompraModel, attributes: ["fechaCompra", "cantidad"], where: {
        fechaCompra: { [Op.between]: [startedDate, endDate] },
      }
    }], attributes: ["nombre", "categoria", "precio_Compra"],


  });

  var total = 0;
  var product: any;
  let productomasVendido='';




  const registros = records.map((producto) => {
    const registro = {
      fecha_Compra: producto.Detalle_CompraModels.fechaCompra,
      categoria: producto.categoria,
      nombre: producto.nombre,
      cantidad: producto.Detalle_CompraModels.cantidad,
      precioC: producto.precio_Compra,
      precioT: producto.Detalle_CompraModels.cantidad * producto.precio_Compra,
    }

    total = total+ registro.precioT;

    if(productomasVendido< producto.Detalle_CompraModels.cantidad){
      productomasVendido=producto.Detalle_CompraModels.cantidad
    }
    if (registro.cantidad === productomasVendido) {
      product = registro.nombre;
    }


    return registro;


  });





  doc.setDocumentHeader({ heigth: '20%' }, () => {


    doc.image("src/public/assets/img/Logo.png", 50, 15, { width: 60, heigth: 60 });

    doc.fill("#115dc8")
      .fontSize(28)
      .text("CREATIVE IDEAS", doc.header.x + 180, doc.header.y + 20);


    doc.fill("#000000")
      .fontSize(10)
      .text(today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(), 10 + 530);



    doc.fontSize(8).fill('#110000').text('Reporte compra de productos de la fecha ' + ini + ' a ' + fin, doc.header.x + 50, doc.header.y + 55, {

      width: 500,
      align: 'center',


    })
 

 
   

  });

  // Add some text with annotations
 
  try {
    doc.addTable([
      { key: 'fecha_Compra', label: 'Fecha compra', align: 'center' },
      { key: 'categoria', label: 'Categoria', align: 'center' },
      { key: 'nombre', label: 'Nombre producto', align: 'center' },
      { key: 'cantidad', label: 'Cantidad', align: 'center' },
      { key: 'precioC', label: 'Precio Unitario', align: 'center' },
      { key: 'precioT', label: 'Precio Total', align: 'center' }],
      registros, {
      border: null,
      width: "fill_body",
      striped: true,
      stripedColors: ["#FFFFFF", "#FFFFFF"],
      cellsPadding: 10,
      headAlign: 'center',
      headFont: "Helvetica-Bold",

    });
    doc.setDocumentFooter({ height: '25%' }, () => {
      doc.fontSize(10).text(
        'El total de la compra es: '+total,doc.footer.x+20,doc.footer.y);
        doc.fontSize(10).text(
          'Tu producto más demandado es ' + product+' se recomienda que compres en cantidades más grandes para realizar menos movimientos',doc.footer.x+20,doc.footer.y+20)

    });

    


    doc.render();
    doc.end();

  } catch (error) {


    doc.setDocumentHeader({ heigth: '10%' }, () => {

      doc.image("src/public/assets/img/Logo.png", 50, 15, { width: 60, heigth: 60 });

      doc.fill("#115dc8")
        .fontSize(28)
        .text("CREATIVE IDEAS", doc.header.x + 180, doc.header.y + 20);

      doc.fontSize(12).fill('#110000').text('Durante el rango de fechas seleccionado no se registraron compras', doc.header.x + 50, doc.header.y + 300, {
        width: 500,
        align: 'center',



      })


    });


    doc.setDocumentFooter({ height: '10%' }, () => {
    });


    doc.render();
    doc.end();
  }
}

