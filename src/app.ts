import express, { Application } from "express";
import morgan from "morgan";
import path from "path"
import dotenv from "dotenv";
dotenv.config();

import indexRouter from "./routes/vistas.route";
import exampleRouter from "./routes/cliente.route";
import iniciosesionRouter from "./routes/iniciosesion.route";
import empleadoRouter from "./routes/empleado.route";
import productoRouter from "./routes/producto.route";
import proveedorRouter from "./routes/proveedor.route";


const app: Application = express();


//settings
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './views'));



//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')))

//routes
app.use("/", indexRouter);
app.use("/api/v1/example", exampleRouter);
app.use("/catalogo/producto", productoRouter);
app.use("/iniciosesion", iniciosesionRouter);
app.use("/catalogo/empleado", empleadoRouter);
app.use("/catalogo/proveedor", proveedorRouter);

export default app;


