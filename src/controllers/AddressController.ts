import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import { addressSchema } from "../schema/users";
import AddressService from "./../services/AddressService";
import { NextFunction, Request, Response } from "express";

const addressService = new AddressService();

class AddressController {
  async create(req: Request, res: Response) {
    req.body.user = req.user.id;
    console.log(req.body);
    addressSchema.parse(req.body);
    let address = await addressService.create(req.body);
    res.status(200).json({ address });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const address = await addressService.delete(id);
    if (!address) {
      return next(
        new NotFoundException("Address not found", ErrorCodes.ADDRESS_NOT_FOUND)
      );
    }

    res.send();
  }

  async find(req: Request, res: Response) {
    const relations: string[] = [];
    const where = { user: req.user.id };
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const addresses = await addressService.find(relations, skip, limit, where);
    res.status(200).json({ page, length: addresses.length, addresses });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const updatedAddress = await addressService.update(id, req.body);
    if (!updatedAddress) {
      return next(
        new NotFoundException("Address not found", ErrorCodes.ADDRESS_NOT_FOUND)
      );
    }

    res.status(200).json({ updatedAddress });
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    const relations: string[] = [];
    const where = { id, userId };
    console.log(where);
    const address = await addressService.findOne(relations, where);

    if (!address) {
      return next(
        new NotFoundException("Address not found", ErrorCodes.ADDRESS_NOT_FOUND)
      );
    }

    res.status(200).json({ address });
  }
}

export default AddressController;
