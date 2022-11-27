import { Request, Response } from "express";
import { ComprasModel } from "../models/compra.model";
import { Detalle_CompraModel } from "../models/detalle_compra.model";
import { ProductosModel } from "../models/productos.model";
import { ProveedoresModel } from "../models/proveedores.model";


export async function createCompra(req: Request, res: Response) {
    let { producto, cantidad, proveedor } = req.body;
    //Trim para eliminar los espacios
    producto = String(producto.trim());
    proveedor = String(proveedor.trim());
    cantidad = parseInt(cantidad);
    console.log(proveedor, producto, cantidad);


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
    console.log(existencia);


    console.log(busquedaProducto);
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

            res.status(201).render("registrocompras", {alert: true,alertTitle: 'COMPRA REGISTRADA',alertMessage: "",alertIcon: 'success',ruta: '/registroCompras'});

        } else {
            res.render("registrocompras", {alert: true,alertTitle: 'Error', alertMessage: "PROVEEDOR NO EXISTE",alertIcon: 'error',ruta: '/registroCompras'});
        }


    } else {
        res.render("registrocompras", { alert: true,alertTitle: 'Error',alertMessage: "PRODUCTO NO EXISTE",alertIcon: 'error',ruta: '/registroCompras'});

    }

}

export async function getCompras(req: Request, res: Response) {
    const records = await Detalle_CompraModel.findAll({ raw: true, attributes: ["idCompra", "idProducto", "cantidad"] });
    res.status(200).json(records);
}