import { Request, response, Response } from "express";
import { Detalle_VentaModel } from "../models/detalle_venta.model";
import { ProductosModel } from "../models/productos.model";


export async function getDetalleVentas(req: Request, res: Response) {
    const records= await ProductosModel.findAll({raw: true ,include:[{model:Detalle_VentaModel,attributes:["id_DV", "idVenta","cantidad","precio_Total"]}],attributes:["nombre"]});
    console.log(records);    
    res.status(200).json(records);
}
