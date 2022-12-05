import {Router} from "express";


import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente,vistaPrincipal,vistaConfirmarVentas,vistaApartados,vistaVentas, vistaRegistroCompras, vistaCompras,vistaRegistroProveedor,vistaProveedor,vistaListaClientes,vista_Confirmar_Ventas_Vendedor,vista_Eliminar_Apartados_Administrador,vista_Eliminar_Apartados_Vendedor,vista_Lista_productos_Vendedor,vista_Ver_Ventas, vista_carrito, vista_Principal_Vendedor, permisos,indexResponse} from "../controllers/vistas.controller";

const indexRouter: Router = Router();

import { createLogginMiddleware } from "../middlewares/loggin.middleware";

const protegerRutaFuncion = createLogginMiddleware(["*"]);

//PROTECCION DE RUTAS:

indexRouter.get("/", vistaSesion);
indexRouter.get("/permisos",protegerRutaFuncion, permisos);
indexRouter.get("/registro",vistaRegistroClientes)
indexRouter.get("/administrador",protegerRutaFuncion,vistaAdministrador)
indexRouter.get("/cliente",protegerRutaFuncion,vistaCliente)
indexRouter.get("/registroEmpleado",protegerRutaFuncion,vistaRegistroEmpleado)
indexRouter.get("/vistaRegistroProducto",protegerRutaFuncion, vistaRegistroProducto);
indexRouter.get("/cerrarSesion",vistaPrincipal);
indexRouter.get("/viewVentas",protegerRutaFuncion,vistaApartados);
indexRouter.get("/confirmarVentas",protegerRutaFuncion,vistaConfirmarVentas);
indexRouter.get("/viewDetalleVentas",protegerRutaFuncion,vistaVentas);
indexRouter.get("/registroCompras", protegerRutaFuncion,vistaRegistroCompras);
indexRouter.get("/vistaRegistroProveedor", protegerRutaFuncion,vistaRegistroProveedor);
indexRouter.get("/viewProveedor", protegerRutaFuncion,vistaProveedor);

indexRouter.get("/viewCompras", protegerRutaFuncion,vistaCompras);
indexRouter.get("/listaClientes",protegerRutaFuncion, vistaListaClientes);

indexRouter.get("/viewProductos/vendedor", protegerRutaFuncion,vista_Lista_productos_Vendedor);
indexRouter.get("/vendedor/confirmarVentas", protegerRutaFuncion,vista_Confirmar_Ventas_Vendedor);

indexRouter.get("/vendedor/ApartadosVencidos", protegerRutaFuncion,vista_Eliminar_Apartados_Vendedor);
indexRouter.get("/apartadosVencidos", protegerRutaFuncion,vista_Eliminar_Apartados_Administrador);

//Agregado apenas
indexRouter.get("/vendedor/verVentas",protegerRutaFuncion,vista_Ver_Ventas);

//Vista carrito
indexRouter.get("/carrito",vista_carrito);


indexRouter.get("/vendedor",vista_Principal_Vendedor);

export default indexRouter;


/*import {Router} from "express";


import { vistaSesion,vistaRegistroClientes,vistaAdministrador,vistaRegistroEmpleado, vistaRegistroProducto,vistaCliente,vistaPrincipal,vistaConfirmarVentas,vistaApartados,vistaVentas, vistaRegistroCompras, vistaCompras,vistaRegistroProveedor,vistaProveedor,vistaListaClientes,vista_Confirmar_Ventas_Vendedor,vista_Eliminar_Apartados_Administrador,vista_Eliminar_Apartados_Vendedor,vista_Lista_productos_Vendedor,vista_Ver_Ventas, vista_carrito, vista_Principal_Vendedor, permisos,indexResponse} from "../controllers/vistas.controller";

const indexRouter: Router = Router();

import { createLogginMiddleware } from "../middlewares/loggin.middleware";

const protegerRutaFuncion = createLogginMiddleware(["*"]);

//PROTECCION DE RUTAS:

indexRouter.get("/", vistaSesion);

indexRouter.get("/permisos",protegerRutaFuncion,indexResponse);

indexRouter.get("/registro",protegerRutaFuncion,vistaRegistroClientes)
indexRouter.get("/administrador",protegerRutaFuncion,vistaAdministrador)
indexRouter.get("/cliente",protegerRutaFuncion,vistaCliente)
indexRouter.get("/registroEmpleado",protegerRutaFuncion,vistaRegistroEmpleado)
indexRouter.get("/vistaRegistroProducto",protegerRutaFuncion, vistaRegistroProducto);
indexRouter.get("/cerrarSesion",protegerRutaFuncion,vistaPrincipal);
indexRouter.get("/viewVentas",protegerRutaFuncion,vistaApartados);
indexRouter.get("/confirmarVentas",protegerRutaFuncion,vistaConfirmarVentas);
indexRouter.get("/viewDetalleVentas",protegerRutaFuncion,vistaVentas);
indexRouter.get("/registroCompras", protegerRutaFuncion,vistaRegistroCompras);
indexRouter.get("/vistaRegistroProveedor", protegerRutaFuncion,vistaRegistroProveedor);
indexRouter.get("/viewProveedor", protegerRutaFuncion,vistaProveedor);

indexRouter.get("/viewCompras", protegerRutaFuncion,vistaCompras);
indexRouter.get("/listaClientes",protegerRutaFuncion, vistaListaClientes);

indexRouter.get("/viewProductos/vendedor",protegerRutaFuncion, vista_Lista_productos_Vendedor);
indexRouter.get("/vendedor/confirmarVentas", protegerRutaFuncion,vista_Confirmar_Ventas_Vendedor);

indexRouter.get("/vendedor/ApartadosVencidos", protegerRutaFuncion,vista_Eliminar_Apartados_Vendedor);
indexRouter.get("/apartadosVencidos", protegerRutaFuncion,vista_Eliminar_Apartados_Administrador);

//Agregado apenas
indexRouter.get("/vendedor/verVentas",protegerRutaFuncion,vista_Ver_Ventas);

//Vista carrito
indexRouter.get("/carrito",vista_carrito);


indexRouter.get("/vendedor",vista_Principal_Vendedor);

export default indexRouter;


*/