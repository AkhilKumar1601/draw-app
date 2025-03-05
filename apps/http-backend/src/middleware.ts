import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId? : string
}

export function middleware(req: CustomRequest, res : Response, next : NextFunction) {
   const token = req.headers["authorization"] || "";

   const decoded = jwt.verify(token,JWT_SECRET) as CustomRequest;

   if(decoded) {
    req.userId = decoded.userId;
    next();
   } else {
    res.json({
      message : "Unauthorized"
    })
   }
}