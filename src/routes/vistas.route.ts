import {Router} from "express";
import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente,vistaPrincipal,vistaConfirmarVentas,vistaApartados,vistaVentas, vistaRegistroCompras, vistaCompras} from "../controllers/vistas.controller";

const indexRouter: Router = Router();


indexRouter.get("/", vistaSesion);
indexRouter.get("/registro",vistaRegistroClientes)
indexRouter.get("/administrador",vistaAdministrador)
indexRouter.get("/cliente",vistaCliente)
indexRouter.get("/registroEmpleado",vistaRegistroEmpleado)
indexRouter.get("/vistaRegistroProducto", vistaRegistroProducto);
indexRouter.get("/cerrarSesion",vistaPrincipal);
indexRouter.get("/viewVentas",vistaApartados);
indexRouter.get("/confirmarVentas",vistaConfirmarVentas);
indexRouter.get("/viewDetalleVentas",vistaVentas);
indexRouter.get("/registroCompras", vistaRegistroCompras);

indexRouter.get("/viewCompras", vistaCompras);
export default indexRouter;
