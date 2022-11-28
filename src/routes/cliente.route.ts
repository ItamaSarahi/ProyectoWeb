import {Router} from "express";
import {createCliente,getClientes} from "../controllers/cliente.controller"
const exampleRouter: Router = Router();


exampleRouter.post("/createCliente",createCliente);
exampleRouter.get("/getClientes",getClientes);

export default exampleRouter;
   