import CartController from "../controllers/CartController";
import { Router } from "express";
import authMiddleware from "../middlewares/auth";
const cartController = new CartController();

const cartRouter = Router();
cartRouter
  .route("/add-item")
  .post([authMiddleware], cartController.addItemToCart);

// cartRouter.route("/").get([authMiddleware], cartController.getCartById);
cartRouter
  .route("/remove/:productId")
  .delete([authMiddleware], cartController.removeItemFromCart);

cartRouter
  .route("/update/:productId")
  .put([authMiddleware], cartController.updateQuantity);

cartRouter.route("/checkout").get([authMiddleware], cartController.checkout);
cartRouter.route("/items").get([authMiddleware], cartController.getCartItems);
cartRouter
  .route("/items/clear")
  .delete([authMiddleware], cartController.clearCart);
export default cartRouter;
