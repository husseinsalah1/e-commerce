import { NextFunction, Request, Response } from "express";
import UnauthorizedException from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { Role } from "../entities/User";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user.role === Role.ADMIN) {
    return next();
  }
  return next(
    new UnauthorizedException(
      "Unauthorized access!",
      ErrorCodes.UNAUTHORIZED_ACCESS
    )
  );
};

export default adminMiddleware;
