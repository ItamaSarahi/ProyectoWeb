import {Router} from "express";
import {findIniciarSesion,updateCliente,indexViewCliente,getExampleById,getExampleCliente,indexViewClientes} from "../controllers/iniciosesion.controller"
const iniciosesionRouter: Router = Router();

//checar rutas
iniciosesionRouter.post("/registro",findIniciarSesion);
iniciosesionRouter.post("/client/update",updateCliente)
iniciosesionRouter.get("/view", indexViewCliente);
iniciosesionRouter.get("/client",getExampleCliente);
iniciosesionRouter.get("/client/:idCliente",getExampleById);
iniciosesionRouter.get("/clientd",indexViewClientes);

export default iniciosesionRouter;
 
 

