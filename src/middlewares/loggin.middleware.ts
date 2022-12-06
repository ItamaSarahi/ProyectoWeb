import { Request, Response, NextFunction } from "express";

export function createLogginMiddleware(rolUser:string[]){

  
    return (req: Request, res: Response, next: NextFunction) => {
    
        if (!req.session.user) {
            return res.redirect("/");
        }
        
        next(); 
    }

}