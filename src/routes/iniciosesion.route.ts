import {Router} from "express";
import {findIniciarSesion,updateCliente,getDatosClienteEditar,getTablaCliente,indexViewEditarCliente} from "../controllers/iniciosesion.controller"
const iniciosesionRouter: Router = Router();

//checar rutas
iniciosesionRouter.post("/cliente",findIniciarSesion);
iniciosesionRouter.put("/update/cliente",updateCliente)
iniciosesionRouter.get("/datosCliente",getTablaCliente);
iniciosesionRouter.get("/datosCliente/:idCliente",getDatosClienteEditar);
iniciosesionRouter.get("/vista/editarCliente",indexViewEditarCliente);

export default iniciosesionRouter;
 
 

