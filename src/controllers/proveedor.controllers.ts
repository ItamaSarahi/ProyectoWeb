import { Request, Response } from "express";
import { ProveedoresModel } from "../models/proveedores.model";


const PDF = require('pdfkit-construct');

//Vista proveedor
export function indexViewProveedor(req: Request, res: Response) {
  return res.render("registroProveedor-view");
}

export function indexViewProveedores(req: Request, res: Response) {
  return res.render("view-proveedor");
}

//Funcion para crear un proveedor en la base de datos

export async function createProveedor(req: Request, res: Response) {
  const { empresa, telefono } = req.body;
  let busqueda

  await ProveedoresModel.findOne({ where: { empresa: empresa } }).then(result => busqueda = result);

  //Si la empresa no existe:
  if (busqueda == null) {

    await ProveedoresModel.create({ empresa, telefono });
    const records = await ProveedoresModel.findAll({ raw: true });
    res.status(201).render("registroProveedor-view", { alert: true, alertTitle: 'PROVEEDOR REGISTRADO', alertMessage: "", alertIcon: 'success', ruta: '/vistaRegistroProveedor' });

    //Si la empresa no existe:
  } else {
    res.render("registroProveedor-view", { alert: true, alertTitle: 'Error', alertMessage: "PROVEEDOR YA EXISTE", alertIcon: 'error', ruta: '/vistaRegistroProveedor' });
  }
}

//Obtener la información del proveedor por medio del ID
export async function getExampleProveedor(req: Request, res: Response) {
  const records = await ProveedoresModel.findAll({ raw: true, attributes: ["idProveedor", "empresa", "telefono"] });
  res.status(200).json(records);
}

export async function getExampleById(req: Request, res: Response) {
  const { idProveedor } = req.params;
  const records = await ProveedoresModel.findAll({ raw: true, where: { idProveedor } });
  res.status(200).json(records);
}

//Eliminar proveedor por medio de ID
export async function deleteId(req: Request, res: Response) {
  const { idProveedor } = req.params;
  const entity = await ProveedoresModel.findByPk(idProveedor);
  await entity?.destroy();
  res.status(204).json({ ok: "" });
}

//Actualizar proveedor
export async function updateProveedor(req: Request, res: Response) {
  const { empresa, telefono } = req.body;
  let busqueda, id;

  await ProveedoresModel.findOne({ where: { empresa: empresa } }).then(result => busqueda = result);


  if (busqueda == null) {
    res.render("view-proveedor", { alert: true, alertTitle: 'Error', alertMessage: "El proveedor no existe", alertIcon: 'error', ruta: '/viewProveedor' });

  } else {

    await ProveedoresModel.findOne({ where: { empresa: empresa } }).then(result => id = result?.getDataValue('idProveedor'));
    const responde = await ProveedoresModel.update({ telefono: telefono }, { where: { idProveedor: id } }).then(function (data) {
      const res = { success: true, data: data, message: "updated successful" };

      return res;

    }).catch(error => {
      const res = { success: false, error: error }
      return res;
    });

    res.render("view-proveedor", { alert: true, alertTitle: 'Error', alertMessage: "proveedor actualizado con exito", alertIcon: 'sucess', ruta: '/viewProveedor' });
  }
}




export async function getPDFProveedor(req: Request, res: Response) {

  const doc = new PDF({ bufferPages: true });

  const fileName = `Reporte-Proveedores${Date.now()}.pdf`;
  const stream = res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-disposition': `attachment;filename=${fileName}` });

  doc.on('data', (data: any) => { stream.write(data) })
  doc.on('end', () => { stream.end() });


  const proveedores = await ProveedoresModel.findAll({ raw: true, attributes: ["idProveedor", "empresa", "telefono"] });
  const registros = proveedores.map((proveedor) => {
    const registro = {
      id: proveedor.idProveedor,
      empresa: proveedor.empresa,
      num_telefono: proveedor.telefono,
    }
    return registro;
  });

  doc.setDocumentHeader({}, () => {

    doc.image("src/public/assets/img/Logo.png", 50, 15, { width: 60, heigth: 60 });

    doc.fill("#115dc8")
      .fontSize(28)
      .text("CREATIVE IDEAS", doc.header.x + 180, doc.header.y + 20);

    doc.fontSize(12).fill('#110000').text('Reporte de proveedores registrados en el sistema', {
      width: 250,
      align: 'center',
    });
  });



  doc.addTable([
    { key: 'id', label: '#', align: 'center' },
    { key: 'empresa', label: 'Empresa', align: 'center' },
    { key: 'num_telefono', label: 'Numero teléfonico', align: 'center' }],

    registros, {
    border: null,
    width: "fill_body",
    striped: true,
    stripedColors: ["#719CC8", "#FFFFFF"],
    cellsPadding: 7,
    marginLeft: 30,
    marginRight: 30,
    headAlign: 'center',
    headFont: "Helvetica-Bold",
  });

  doc.setDocumentFooter({ height: '10%' }, () => { });

  doc.render();

  doc.end();

}