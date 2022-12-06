import express, { Application } from "express";
import morgan from "morgan";
import path from "path"

/*
import dotenv from "dotenv";
dotenv.config();
*/

const app: Application = express();
var methodOverride = require('method-override');
//
import indexRouter from "./routes/vistas.route";
import exampleRouter from "./routes/cliente.route";
import iniciosesionRouter from "./routes/iniciosesion.route";
import empleadoRouter from "./routes/empleado.route";
import productoRouter from "./routes/producto.route";
import proveedorRouter from "./routes/proveedor.route";
import fileRoute from "./routes/file.route";
import ventasRouter from "./routes/ventas.route";
import detalleVentasRouter from "./routes/detalleVentas.route";
import comprasRouter from "./routes/compras.route";
import productosClientes from "./routes/productos_clientes";
import { sessionConfig, sessionMiddleware } from "./middlewares/express-session.middleware";
import { createLogginMiddleware } from "./middlewares/loggin.middleware";


//settings
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './views'));



//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')))

app.use(sessionConfig);
app.use(sessionMiddleware);


//routes
const protegerRutaFuncion = createLogginMiddleware(["*"]);

app.use("/",indexRouter);
app.use("/api/v1/example",exampleRouter);
app.use("/modulo/producto",protegerRutaFuncion,methodOverride('_method'),productoRouter,);
app.use("/iniciosesion",methodOverride('_method'), iniciosesionRouter);
app.use("/catalogo/empleado",protegerRutaFuncion,methodOverride('_method'), empleadoRouter);
app.use("/catalogo/proveedor",protegerRutaFuncion,methodOverride('_method'), proveedorRouter);
app.use("/api/imagen/file",fileRoute);
app.use("/modulo/ventas",protegerRutaFuncion,methodOverride('_method'),ventasRouter);
app.use("/modulo/detalleVentas",protegerRutaFuncion,detalleVentasRouter);
app.use("/modulo/compras",protegerRutaFuncion,comprasRouter);

app.use("/productos",protegerRutaFuncion,productosClientes)



export default app;

