import {Router} from "express";
import { createCompra,getCompras,getPDFCompras} from "../controllers/compras.controllers";

const comprasRouter: Router = Router();

comprasRouter.post("/", createCompra);
comprasRouter.get("/getCompras",getCompras);
comprasRouter.post("/getPDFPro",getPDFCompras);


export default comprasRouter;