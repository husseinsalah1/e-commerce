import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCodes } from "../exceptions/root";
import { ProductSchema } from "../schema/product";
import responseMessage from "./responseMessage";

const productService = new ProductService();
const select = {
  id: true,
  name: true,
  description: true,
  price: true,
  tags: true,
  user: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
  },
  createdAt: true,
  updatedAt: true,
};
export default class ProductControllers {
  async create(req: Request, res: Response) {
    const productData = {
      ...req.body,
      user: req.user.id,
      tags: req.body.tags?.split(",") || [],
    };
    // Validate the incoming data
    ProductSchema.parse(productData);
    // if the data is valid, create the product
    // else throw zod error, which will be caught by the error handler
    const product = await productService.create(productData);
    res.json(responseMessage(true, product, "Product created successfully"));
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const relations: string[] = ["user"];
    const where = { id };

    const product = await productService.findOne({
      where,
      select,
      relations,
    });

    if (!product) {
      return next(
        new NotFoundException("Product not found", ErrorCodes.PRODUCT_NOT_FOUND)
      );
    }
    res.json(responseMessage(true, product, "Product found successfully"));
  }

  async findAll(req: Request, res: Response) {
    const relations = ["user"];
    const page = parseInt(req.query.page as string, 10) || 1;
    const take = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * take;
    const products = await productService.findAll({
      relations,
      skip,
      take,
      select,
    });
    res.json({
      success: true,
      page,
      length: products.length,
      data: products,
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const updateDate = req.body;

    if (updateDate.tags) {
      updateDate.tags = req.body.tags.split(",");
    }

    const updateProduct = await productService.update(id, updateDate);
    console.log(updateProduct);
    if (!updateProduct) {
      return next(
        new NotFoundException("Product not found", ErrorCodes.PRODUCT_NOT_FOUND)
      );
    }

    res.json(
      responseMessage(true, updateProduct, "Product updated successfully")
    );
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const result = await productService.delete(id);
    if (!result) {
      return next(
        new NotFoundException("Product not found", ErrorCodes.PRODUCT_NOT_FOUND)
      );
    }

    res.json(responseMessage(true, null, "Product deleted successfully"));
  }

  async search(req: Request, res: Response) {
    const letter = req.query.letter as string;
    const products = await productService.search(letter);
    res.json({
      length: products.length,
      ...responseMessage(true, products, "Products found successfully"),
    });
  }
}
