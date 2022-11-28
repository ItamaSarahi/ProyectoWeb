import {Router} from "express";
import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente,vistaPrincipal,vistaConfirmarVentas,vistaApartados,vistaVentas, vistaRegistroCompras, vistaCompras,vistaRegistroProveedor,vistaProveedor,vistaListaClientes} from "../controllers/vistas.controller";

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
indexRouter.get("/vistaRegistroProveedor", vistaRegistroProveedor);
indexRouter.get("/viewProveedor", vistaProveedor);

indexRouter.get("/viewCompras", vistaCompras);
indexRouter.get("/listaClientes", vistaListaClientes);
export default indexRouter;


