import {Router} from "express";
import {createCliente,getClientes, getPDFClientes} from "../controllers/cliente.controller"
const exampleRouter: Router = Router();


exampleRouter.post("/createCliente",createCliente);
exampleRouter.get("/getClientes",getClientes);
exampleRouter.post("/getPDF",getPDFClientes);

export default exampleRouter;
   