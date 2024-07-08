import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import ProductControllers from "./../controllers/products";

const productsRouter: Router = Router();
const productControllers = new ProductControllers();
productsRouter
  .route("/")
  .post(
    [authMiddleware, adminMiddleware],
    errorHandler(productControllers.create)
  )
  .get(errorHandler(productControllers.findAll));

productsRouter.route("/:id").get(errorHandler(productControllers.findOne));

export default productsRouter;
