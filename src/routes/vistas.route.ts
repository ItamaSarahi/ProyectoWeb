import {Router} from "express";
import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente,vistaPrincipal,vistaConfirmarVentas,vistaApartados,vistaVentas, vistaRegistroCompras, vistaCompras,vistaRegistroProveedor,vistaProveedor,vistaListaClientes,vista_Confirmar_Ventas_Vendedor,vista_Eliminar_Apartados_Administrador,vista_Eliminar_Apartados_Vendedor,vista_Lista_productos_Vendedor,vista_Ver_Ventas, vista_carrito, vista_Principal_Vendedor, permisos} from "../controllers/vistas.controller";

const indexRouter: Router = Router();


indexRouter.get("/", vistaSesion);

indexRouter.get("/permisos", permisos);


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

indexRouter.get("/viewProductos/vendedor", vista_Lista_productos_Vendedor);
indexRouter.get("/vendedor/confirmarVentas", vista_Confirmar_Ventas_Vendedor);

indexRouter.get("/vendedor/ApartadosVencidos", vista_Eliminar_Apartados_Vendedor);
indexRouter.get("/apartadosVencidos", vista_Eliminar_Apartados_Administrador);

//Agregado apenas
indexRouter.get("/vendedor/verVentas",vista_Ver_Ventas);

//Vista carrito
indexRouter.get("/carrito",vista_carrito);


indexRouter.get("/vendedor",vista_Principal_Vendedor);

export default indexRouter;


