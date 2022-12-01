import {Router} from "express";
import {createEmpleado,getTablaEmpleado,indexViewRegistroEmpleado,indexViewVerEmpleados,updateEmpleado,getEmpleadoEditar,deleteEmpleado,getFactura} from "../controllers/empleado.controller"
const empleadoRouter: Router = Router();
  
empleadoRouter.get("/viewRegistroEmpleado", indexViewRegistroEmpleado);
empleadoRouter.post("/registrarEmpleados",createEmpleado);
empleadoRouter.get("/tablaEmpleados",getTablaEmpleado);
empleadoRouter.get("/verEmpleados",indexViewVerEmpleados);
empleadoRouter.put("/update",updateEmpleado); 
empleadoRouter.get("/tablaEmpleados/:idEmpleado",getEmpleadoEditar);
empleadoRouter.delete("/tablaEmpleados/delete/:idEmpleado",deleteEmpleado);

empleadoRouter.post("/factura",getFactura);
 

export default empleadoRouter;
 