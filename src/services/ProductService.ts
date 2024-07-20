import { getCustomRepository, Repository } from "typeorm";
import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";
import BaseService from "./BaseService";

class ProductService extends BaseService<Product> {
  private productRepository: ProductRepository = new ProductRepository();
  constructor() {
    super(new ProductRepository());
  }

  async search(letter: string) {
    return this.productRepository.search(letter);
  }
}

export default ProductService;
