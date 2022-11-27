import {Router} from "express";
import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente, vistaVendedor} from "../controllers/vistas.controller";

const indexRouter: Router = Router();


indexRouter.get("/", vistaSesion);
indexRouter.get("/registro",vistaRegistroClientes)
indexRouter.get("/administrador",vistaAdministrador)
indexRouter.get("/cliente",vistaCliente)
indexRouter.get("/registroEmpleado",vistaRegistroEmpleado)
indexRouter.get("/view",  vistaRegistroProducto);
indexRouter.get("/vendedor", vistaVendedor)
 
export default indexRouter;
