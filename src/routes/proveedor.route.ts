import {Router} from "express";
import { indexViewProveedor,createProveedor ,getExampleProveedor,getExampleById, indexViewProveedores,updateProveedor,deleteId, getPDFProveedor } from "../controllers/proveedor.controllers";

const proveedorRouter: Router = Router();
 
proveedorRouter.get("/view", indexViewProveedor);
proveedorRouter.post("/view/create",createProveedor);
proveedorRouter.get("/prove",getExampleProveedor);
proveedorRouter.get("/prove/:idProveedor",getExampleById);
proveedorRouter.get("/proved",indexViewProveedores);
proveedorRouter.put("/update",updateProveedor);
proveedorRouter.delete("/prove/delete/:idProveedor",deleteId);

proveedorRouter.post("/getPdf",getPDFProveedor);
export default proveedorRouter; 
 
 