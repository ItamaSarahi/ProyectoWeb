import {Router} from "express";
import { indexResponse} from "../controllers/vistas.controller";
import { createLogginMiddleware } from "../middlewares/loggin.middleware";

const protegerRutaFuncion = createLogginMiddleware(["*"]);
const indexRouter: Router = Router();

indexRouter.get("/",protegerRutaFuncion,indexResponse);

export default indexRouter;
   