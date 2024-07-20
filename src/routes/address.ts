import { Router } from "express";
import AddressController from "../controllers/AddressController";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";

const addressRouter = Router();

const addressController = new AddressController();
addressRouter
  .route("/")
  .post([authMiddleware], errorHandler(addressController.create))
  .get([authMiddleware], errorHandler(addressController.find));
addressRouter
  .route("/:id")
  .delete([authMiddleware], errorHandler(addressController.delete))
  .put([authMiddleware], errorHandler(addressController.update))
  .get([authMiddleware], errorHandler(addressController.findOne));
export default addressRouter;
