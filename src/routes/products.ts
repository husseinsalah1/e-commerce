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

productsRouter.route("/search").get(errorHandler(productControllers.search));

productsRouter.route("/:id").get(errorHandler(productControllers.findOne));
productsRouter.route("/:id").put(errorHandler(productControllers.update));
productsRouter.route("/:id").delete(errorHandler(productControllers.delete));
export default productsRouter;
