import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/root";
import logger from "../utils/logger";

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
    errors: err.errors,
  });

  next();
};
