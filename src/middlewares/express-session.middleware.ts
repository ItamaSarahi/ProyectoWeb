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
  //nombre de la sesion: porque se pueden tener varios tipos de sesiones.
  name: "session-cookie",
  //cadena alfanumerica para cifrar la sesion.
  secret: "secreto123",
  //si la sesion actual ya vencio,no se actualiza. cuando una sesion expire se termino.
  resave: false,
  //si yo quiero crear una sesion port defecto. Solo se le da sesion si ingresa usuario y contraseña

  //la sesion se guarda en una coockie.
  saveUninitialized: false,
  //fagmento cifrado que puede tener o no un tiempo de expiracion: informacion que cuando expire va a desaparecer
  cookie: {
    //manejar de manera segura: protocolo http y https, si es segura solo creara la coockie si se maneja https
    secure: false,
    httpOnly: true,
    signed: true,
    //a partir de su creacion es su tiepo de expiracion
    maxAge: (60 * 1000),
  },
});

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction)=> {
  const {user} =  req.session;
  console.log(user);
  res.locals.user = user;
  next();
}