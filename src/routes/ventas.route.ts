import {Router} from "express";
import { getVentas,getApartados,getApartadosById,updateVenta,getApartadosVencidos,indexViewVentasVencidas,updateVentaVendedor,deleteApartados,getVentasEmpleado} from "../controllers/ventas.controllers";

const ventasRouter: Router = Router();

ventasRouter.get("/getVentas",getVentas);
ventasRouter.get("/getApartados",getApartados);
ventasRouter.get("/getVentasEmpleado",getVentasEmpleado);
ventasRouter.get("/getApartados/:idVenta",getApartadosById);
ventasRouter.put("/update",updateVenta);
ventasRouter.get("/viewApartadosVencidos",indexViewVentasVencidas);

ventasRouter.put("/vendedor/update",updateVentaVendedor);
ventasRouter.delete("/getApartadosVencidos/delete/:idVenta",deleteApartados);
ventasRouter.get("/getApartadosVencidos",getApartadosVencidos);
export default ventasRouter;