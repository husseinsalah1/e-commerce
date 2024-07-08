import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import { AppDataSource } from "../config/connection";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { signupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found-exception";
const userRepository = AppDataSource.getRepository(User);
declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(signupSchema.parse(req.body));
  const { email, password } = req.body;
  let user = await userRepository.findOne({ where: { email } });
  if (user) {
    return next(
      new BadRequestException(
        "User already exists!",
        ErrorCodes.USER_ALREADY_EXISTS
      )
    );
  }
  req.body.password = hashSync(password, 10);
  let newUser = userRepository.create(req.body);
  await userRepository.save(newUser);
  res.status(200).json({ newUser });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user = await userRepository.findOne({ where: { email } });
  if (!user) {
    return next(
      new NotFoundException("User not found!", ErrorCodes.USER_NOT_FOUND)
    );
  }

  if (!compareSync(password, user.password)) {
    return next(
      new BadRequestException(
        "Incorrect password",
        ErrorCodes.USER_INCORRECT_PASSWORD
      )
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ user, token });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};
