import { Router } from "express";
import authRoutes from "./auth";
import productsRouter from "./products";
import addressRouter from "./address";
import userRouter from "./users";
import cartRouter from "./cart";
const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRouter);
rootRouter.use("/address", addressRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/cart", cartRouter);

export default rootRouter;
