import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";


export const handleError = (error: any, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  console.error(error); // Log no servidor para depuração

  return response.status(500).json({ error: "Erro interno do servidor" });
};
