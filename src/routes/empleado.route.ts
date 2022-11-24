import {Router} from "express";
import {createEmpleado,getExampleEmpleado,indexViewEmpleado,indexViewEmpleados,updateEmpleado,getExampleById,deleteId} from "../controllers/empleado.controller"
const empleadoRouter: Router = Router();
  
empleadoRouter.get("/view", indexViewEmpleado);
empleadoRouter.post("/registrar",createEmpleado);
empleadoRouter.get("/empleados",getExampleEmpleado);
empleadoRouter.get("/ver",indexViewEmpleados);
empleadoRouter.post("/update",updateEmpleado); 
empleadoRouter.get("/empleados/:idEmpleado",getExampleById);
empleadoRouter.delete("/empleados/delete/:idEmpleado",deleteId);


export default empleadoRouter;
 