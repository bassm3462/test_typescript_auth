import { Request,Response,NextFunction,ErrorRequestHandler } from "express";
export const errorhandler:ErrorRequestHandler=(err,req:Request,res:Response,next:NextFunction)=>{
  const statusCode:any=res.statusCode==200?500: res.statusCode;
  res.status(statusCode)
    return res.json({
        status:"fail",
        message: err?.message,
        stack:err?.stack,
        data:null,
      });
      next()
}