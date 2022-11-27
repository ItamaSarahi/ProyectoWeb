import {Router} from "express";
import { sendFile } from "../controllers/files.controllers";


const fileRouter: Router = Router();

fileRouter.get("/",sendFile);

export default fileRouter;