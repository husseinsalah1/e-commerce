import { getCustomRepository, Repository } from "typeorm";
import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";

class ProductService {
  private productRepository: any;
  constructor() {
    this.productRepository = ProductRepository.getInstance();
  }
  async create(product: Product) {
    console.log(product);
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    return this.productRepository.find({
      skip,
      take: limit,
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }
}

export default ProductService;
