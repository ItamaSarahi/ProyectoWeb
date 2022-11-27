import {Router} from "express";
import { getDetalleVentas} from "../controllers/detalle_ventas.controllers";

const detalleVentasRouter: Router = Router();

detalleVentasRouter.get("/getDetalleVentas",getDetalleVentas);


export default detalleVentasRouter;