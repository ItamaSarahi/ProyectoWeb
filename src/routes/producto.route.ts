import {Router} from "express";
import {createProducto,getProducto,getProductoById,vistaProductos,updateProducto } from "../controllers/producto.controller";
import storageMulter from "../middlewares/multer.middleware";

const productoRouter: Router = Router();

productoRouter.post("/",storageMulter.single("imagen"), createProducto);
productoRouter.get("/getProducto",getProducto);
productoRouter.get("/getProducto/:idProducto",getProductoById);
productoRouter.get("/vistaProductos",vistaProductos);
productoRouter.put("/update",storageMulter.single("imagen"),updateProducto);

export default productoRouter;

