import { Repository } from "typeorm";
import { AppDataSource } from "../config/connection";
import Product from "../entities/Product";

export class ProductRepository {
  private static instance: Repository<Product>;
  static getInstance(): Repository<Product> {
    if (!ProductRepository.instance) {
      ProductRepository.instance = AppDataSource.getRepository(Product);
    }
    return ProductRepository.instance;
  }
}
export default ProductRepository;
