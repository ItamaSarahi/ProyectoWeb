import { Request, Response } from "express";
import { Detalle_VentaModel } from "../models/detalle_venta.model";
import { VentasModel } from "../models/ventas.model";
import 'localstorage-polyfill';



export async function getVentas(req: Request, res: Response) {
    const records = await VentasModel.findAll({ raw: true, where: { status: "PAGADO" }, attributes: ["idVenta", "fecha_Inicial", "fecha_Vencimiento", "status", "idCliente", "idEmpleado"] });
    res.status(200).json(records);
}


export async function getApartados(req: Request, res: Response) {
    const records = await VentasModel.findAll({ raw: true, where: { status: "NO PAGADO" }, attributes: ["idVenta", "fecha_Inicial", "fecha_Vencimiento", "status", "idCliente", "idEmpleado"] });
    res.status(200).json(records);
}


export async function getVentasEmpleado(req: Request, res: Response) {
    const records = await Detalle_VentaModel.findAll({ raw: true, attributes: ["id_DV","cantidad","precio_Total","idProducto"] });
    res.status(200).json(records);

}
//Para obtener una venta no pagada
export async function getApartadosById(req: Request, res: Response) {
    const { idVenta } = req.params;
    const records = await VentasModel.findAll({ raw: true, where: { idVenta } });
    res.status(200).json(records);
}

//Metodo para confirmar y cambiar el estatus a las ventas
export async function updateVenta(req: Request, res: Response) {
    const { venta } = req.body;
    
    const busquedaVenta= await VentasModel.findOne({ where: { idVenta: venta } });

    if (busquedaVenta == null) {
        res.render("confirmarVentas-view", {alert: true,alertTitle: 'Error',alertMessage: "PRODUCTO NO EXISTE",alertIcon: 'error',ruta: '/confirmarVentas'});
        
    } else {
            const responde = await VentasModel.update({ status: "PAGADO" }, { where: { idVenta: venta } }).then(function (data) {
            const res = { success: true, data: data, message: "updated successful" }
            return res;
        }).catch(error => {
            const res = { success: false, error: error }
            return res;
        });

        res.status(201).render("confirmarVentas-view", {alert: true,alertTitle: 'VENTA REGISTRADA',alertMessage: "",alertIcon: 'success',ruta: '/confirmarVentas'});
        
    }

}

export async function getApartadosVencidos(req: Request, res: Response) {
    console.log("NO ENTRE A VENCIDOS");
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let actual;
    if (month < 10) 
        actual = `${year}-0${month}-${day}`;
    else 
        actual = `${year}-${month}-${day}`;
    
    console.log(actual);
    const records = await VentasModel.findAll({ raw: true, where: { fecha_Vencimiento: actual, status: "NO PAGADO" }, attributes: ["idVenta", "fecha_Inicial", "fecha_Vencimiento", "status", "idCliente", "idEmpleado"] });
    console.log(records);
    res.status(200).json(records);


}
//Funcion para ver los apartados vencidos
export function indexViewVentasVencidas(req: Request, res: Response) {
    return res.render("view-apartados");
}

//Metodo para confirmar y cambiar el estatus a las ventas para el vendedor
export async function updateVentaVendedor(req: Request, res: Response) {
    const { venta } = req.body;
    
    const busquedaVenta= await VentasModel.findOne({ where: { idVenta: venta } });

    if (busquedaVenta == null) {
        res.render("confirmarVentas-vendedor", {alert: true,alertTitle: 'Error',alertMessage: "PRODUCTO NO EXISTE",alertIcon: 'error',ruta: '/vendedor/confirmarVentas'});
        
    } else {
            let id=JSON.parse(localStorage.empleado);
            const responde = await VentasModel.update({ status: "PAGADO",idEmpleado:id }, { where: { idVenta: venta } }).then(function (data) {
            const res = { success: true, data: data, message: "updated successful" }
            return res;
        }).catch(error => {
            const res = { success: false, error: error }
            return res;
        });

        res.status(201).render("confirmarVentas-vendedor", {alert: true,alertTitle: 'VENTA REGISTRADA',alertMessage: "",alertIcon: 'success',ruta: '/vendedor/confirmarVentas'});
        
    }

}

//Eliminar un empleado mediante el ID:
export async function deleteApartados(req: Request, res: Response) {
    const { idVenta } = req.params;
    
   const entity = await VentasModel.findByPk(idVenta);
   if(entity==null){
        console.log("No es null",idVenta);
    }else{
        await entity?.destroy();
    }
    res.status(204).json({ ok: "" });
    
  }