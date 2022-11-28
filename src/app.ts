import express, { Application } from "express";
import morgan from "morgan";
import path from "path"
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
var methodOverride = require('method-override');

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
app.use("/modulo/producto",methodOverride('_method'),productoRouter);
app.use("/iniciosesion",methodOverride('_method'), iniciosesionRouter);
app.use("/catalogo/empleado",methodOverride('_method'), empleadoRouter);
app.use("/catalogo/proveedor", proveedorRouter);
app.use("/api/imagen/file",fileRoute);
app.use("/modulo/ventas",methodOverride('_method'),ventasRouter);
app.use("/modulo/detalleVentas",detalleVentasRouter);
app.use("/modulo/compras",comprasRouter);

app.use("/productos",productosClientes)



export default app;

