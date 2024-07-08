import { NextFunction, Request, Response } from "express";
import UnauthorizedException from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { JWT_SECRET } from "./../secrets";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/connection";
import User from "../entities/User";
const userRepository = AppDataSource.getRepository(User);

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return next(
      new UnauthorizedException(
        "Unauthorized access!",
        ErrorCodes.UNAUTHORIZED_ACCESS
      )
    );
  }
  try {
    const payload: {
      userId: number;
    } = jwt.verify(token, JWT_SECRET) as any;

    const user = await userRepository.findOne({
      where: { id: payload.userId },
    });
    if (!user) {
      return next(
        new UnauthorizedException(
          "Unauthorized access!",
          ErrorCodes.UNAUTHORIZED_ACCESS
        )
      );
    }
    req.user = user;
    next();
  } catch (err) {
    return next(
      new UnauthorizedException(
        "Unauthorized access!",
        ErrorCodes.UNAUTHORIZED_ACCESS
      )
    );
  }
};

export default authMiddleware;
