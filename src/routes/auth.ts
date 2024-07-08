import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import asyncHandler from "express-async-handler";
const authRoutes: Router = Router();

authRoutes.route("/signup").post(errorHandler(signup));
authRoutes.route("/login").post(errorHandler(login));
authRoutes.route("/me").get([authMiddleware], errorHandler(me));
export default authRoutes;
