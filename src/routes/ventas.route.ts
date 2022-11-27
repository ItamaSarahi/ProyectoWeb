import {Router} from "express";
import { getVentas,getApartados,getApartadosById,updateVenta,ViewApartadosVencidos,indexViewVentasVencidas} from "../controllers/ventas.controllers";

const ventasRouter: Router = Router();

ventasRouter.get("/getVentas",getVentas);
ventasRouter.get("/getApartados",getApartados);
ventasRouter.get("/getApartados/:idVenta",getApartadosById);
ventasRouter.put("/update",updateVenta);
ventasRouter.get("/apartadosVencidos",ViewApartadosVencidos);
ventasRouter.get("/viewApartadosVencidos",indexViewVentasVencidas);


export default ventasRouter;