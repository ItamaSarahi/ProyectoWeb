import {Router} from "express";
import {getTermos,vistaTermo,vistaTupper,getTuppers, vistaBotellas, vistaCubiertos, vistaExtras, vistaLoncheras, getBotellasAgua, getCubiertos, getExtras, getLoncheras,getProductoById} from "../controllers/productos_clientes";

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

export default productoRouter;

