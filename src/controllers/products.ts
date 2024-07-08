import { Request, Response } from "express";
import ProductService from "../services/ProductService";

const productService = new ProductService();

export default class ProductControllers {
  async create(req: Request, res: Response) {
    const product = await productService.create({
      ...req.body,
      user: req.user.id,
      tags: req.body.tags.split(","),
    });
    res.json(product);
  }

  async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const products = await productService.findAll(page, limit);
    res.json({
      page,
      length: products.length,
      data: products,
    });
  }

  async findOne(req: Request, res: Response) {
    const product = await productService.findOne(parseInt(req.params.id, 10));
    res.json(product);
  }
}
