import {Router} from "express";
import { createCompra,getCompras} from "../controllers/compras.controllers";

const comprasRouter: Router = Router();

comprasRouter.post("/", createCompra);
comprasRouter.get("/getCompras",getCompras);


export default comprasRouter;