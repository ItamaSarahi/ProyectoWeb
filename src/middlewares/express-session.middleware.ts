import { Request, Response, NextFunction } from "express";
import session from "express-session";

import UsuarioType from "../types/usuarios.type";


declare module "express-session" {
  interface SessionData {
    //esto viene del tipo de datos de usuario
    user: UsuarioType;
  }
}

//consiguracion de la sesion
export const sessionConfig = session({
  name: "session-cookie",
  secret: "secreto123",
  resave: false,

  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    signed: true,
    maxAge: 10* (60 * 1000),
  },
});

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction)=> {
  const {user} =  req.session;
  res.locals.user = user;
  next();
}