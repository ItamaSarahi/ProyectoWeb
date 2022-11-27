import {Router} from "express";
import {createEmpleado,getTablaEmpleado,indexViewRegistroEmpleado,indexViewVerEmpleados,updateEmpleado,getEmpleadoEditar,deleteEmpleado} from "../controllers/empleado.controller"
const empleadoRouter: Router = Router();
  
empleadoRouter.get("/viewRegistroEmpleado", indexViewRegistroEmpleado);
empleadoRouter.post("/registrarEmpleados",createEmpleado);
empleadoRouter.get("/tablaEmpleados",getTablaEmpleado);
empleadoRouter.get("/verEmpleados",indexViewVerEmpleados);
empleadoRouter.put("/update",updateEmpleado); 
empleadoRouter.get("/tablaEmpleados/:idEmpleado",getEmpleadoEditar);
empleadoRouter.delete("/tablaEmpleados/delete/:idEmpleado",deleteEmpleado);


export default empleadoRouter;
 