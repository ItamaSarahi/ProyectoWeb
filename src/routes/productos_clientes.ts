import {Router} from "express";
import {getTermos,vistaTermo,vistaTupper,getTuppers, vistaBotellas, vistaCubiertos, vistaExtras, vistaLoncheras, getBotellasAgua, getCubiertos, getExtras, getLoncheras,getProductoById,guardarProductosTermosLocalStorage,recuperarDatos,vaciarCarrito,GenererTicket,guardarProductosCubiertosLocalStorage,guardarProductosTuppersLocalStorage,guardarProductosBotellasLocalStorage,guardarProductosLoncherasLocalStorage,guardarProductosExtrasLocalStorage} from "../controllers/productos_clientes";

const productoRouter: Router = Router();


//Funciona
productoRouter.get("/vistaTermo",vistaTermo);
productoRouter.get("/vistaTupper",vistaTupper);
productoRouter.get("/vistaBotellas",vistaBotellas);
productoRouter.get("/vistaCubiertos",vistaCubiertos);
productoRouter.get("/vistaExtras",vistaExtras);
productoRouter.get("/vistaLoncheras",vistaLoncheras);


productoRouter.get("/mostrarTermos",getTermos);
productoRouter.get("/mostrarTuppers",getTuppers);
productoRouter.get("/mostrarBotellas",getBotellasAgua);
productoRouter.get("/mostrarCubiertos",getCubiertos);
productoRouter.get("/mostrarExtras",getExtras);
productoRouter.get("/mostrarLoncheras",getLoncheras);


productoRouter.get("/mostrarTermos/:idProducto",getProductoById);
productoRouter.get("/mostrarTuppers/:idProducto",getProductoById);
productoRouter.get("/mostrarBotellas/:idProducto",getProductoById);
productoRouter.get("/mostrarCubiertos/:idProducto",getProductoById);
productoRouter.get("/mostrarExtras/:idProducto",getProductoById);
productoRouter.get("/mostrarLoncheras/:idProducto",getProductoById);

productoRouter.get("/guardarDatosTermos/:idProducto/:cantidad",guardarProductosTermosLocalStorage);
productoRouter.get("/guardarDatosCubiertos/:idProducto/:cantidad",guardarProductosCubiertosLocalStorage);
productoRouter.get("/guardarDatosTuppers/:idProducto/:cantidad",guardarProductosTuppersLocalStorage);
productoRouter.get("/guardarDatosBotellas/:idProducto/:cantidad",guardarProductosBotellasLocalStorage);
productoRouter.get("/guardarDatosLoncheras/:idProducto/:cantidad",guardarProductosLoncherasLocalStorage);
productoRouter.get("/guardarDatosExtras/:idProducto/:cantidad",guardarProductosExtrasLocalStorage);

productoRouter.get("/recuperarDatos",recuperarDatos);
productoRouter.get("/vaciarCarrito",vaciarCarrito);
productoRouter.post("/generarTicket",GenererTicket);

export default productoRouter;