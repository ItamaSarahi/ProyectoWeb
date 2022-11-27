import {Router} from "express";
import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente,vistaPrincipal} from "../controllers/vistas.controller";

const indexRouter: Router = Router();


indexRouter.get("/", vistaSesion);
indexRouter.get("/registro",vistaRegistroClientes)
indexRouter.get("/administrador",vistaAdministrador)
indexRouter.get("/cliente",vistaCliente)
indexRouter.get("/registroEmpleado",vistaRegistroEmpleado)
indexRouter.get("/vistaRegistroProducto",  vistaRegistroProducto);
indexRouter.get("/cerrarSesion",vistaPrincipal)
 
export default indexRouter;
