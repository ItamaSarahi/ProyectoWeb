import {Router} from "express";
import {createCliente} from "../controllers/cliente.controller"
const exampleRouter: Router = Router();


exampleRouter.post("/createCliente",createCliente);

export default exampleRouter;
   