import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserServic";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import { updateUserSchema } from "../schema/users";
import Address from "../entities/Address";
import AddressService from "../services/AddressService";
const userService: UserService = new UserService();
const addressService: AddressService = new AddressService();
class UserController {
  async update(req: Request, res: Response, next: NextFunction) {
    updateUserSchema.parse(req.body);
    const userId = req.user.id;
    const userData = req.body;
    let shippingAddress: Address;
    let billingAddress: Address;

    if (userData.defaultShippingAddress) {
      let where = {
        id: parseInt(userData.defaultShippingAddress),
      };
      shippingAddress = await addressService.findOne([], where);
      if (!shippingAddress) {
        return next(
          new NotFoundException(
            "Shipping address not found",
            ErrorCodes.ADDRESS_NOT_FOUND
          )
        );
      }
      if (shippingAddress.user.id !== userId) {
        return next(
          new NotFoundException(
            "Shipping address not found",
            ErrorCodes.ADDRESS_NOT_FOUND
          )
        );
      }
    }
    if (userData.defaultBillingAddress) {
      let where = {
        id: parseInt(userData.defaultShippingAddress),
      };
      billingAddress = await addressService.findOne([], where);
      if (!billingAddress) {
        return next(
          new NotFoundException(
            "Shipping address not found",
            ErrorCodes.ADDRESS_NOT_FOUND
          )
        );
      }
      if (billingAddress.user.id !== userId) {
        return next(
          new NotFoundException(
            "Shipping address not found",
            ErrorCodes.ADDRESS_NOT_FOUND
          )
        );
      }
    }
    const user = await userService.update(userId, userData);
    if (!user) {
      return next(
        new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND)
      );
    }
    res.json(user);
  }
}

export default UserController;
