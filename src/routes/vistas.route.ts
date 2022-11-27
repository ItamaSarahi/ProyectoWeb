import {Router} from "express";
import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente,vistaConfirmarVentas,vistaVentas,vistaDetalleVentas,vistaRegistroCompras,vistaCompras} from "../controllers/vistas.controller";

const indexRouter: Router = Router();


indexRouter.get("/", vistaSesion);
indexRouter.get("/registro",vistaRegistroClientes)
indexRouter.get("/administrador",vistaAdministrador)
indexRouter.get("/cliente",vistaCliente)
indexRouter.get("/registroEmpleado",vistaRegistroEmpleado)
indexRouter.get("/view",  vistaRegistroProducto);
indexRouter.get("/confirmarVentas",vistaConfirmarVentas);
indexRouter.get("/viewVentas",vistaVentas);
indexRouter.get("/viewDetalleVentas",vistaDetalleVentas);
indexRouter.get("/registroCompras",vistaRegistroCompras);
indexRouter.get("/viewCompras",vistaCompras);
export default indexRouter;
