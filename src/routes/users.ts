import { Router } from "express";
import UserController from "../controllers/UserController";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const routerUser = Router();
const userController = new UserController();

routerUser.put(
  "/update",
  [authMiddleware],
  errorHandler(userController.update)
);

export default routerUser;
