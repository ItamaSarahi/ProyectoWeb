import {Router} from "express";
import {createProducto,getExampleProducto,getExampleById,indexViewProductos,updateProducto } from "../controllers/producto.controller";
import storageMulter from "../middlewares/multer.middleware";

const productoRouter: Router = Router();

productoRouter.post("/",storageMulter.single("imagen"), createProducto);
productoRouter.get("/product",getExampleProducto);
productoRouter.get("/product/:idProducto",getExampleById);
productoRouter.get("/producte",indexViewProductos);
productoRouter.post("/update",updateProducto);

export default productoRouter;

