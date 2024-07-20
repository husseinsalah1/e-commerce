import { Like, Repository } from "typeorm";
import { AppDataSource } from "../config/connection";
import Product from "../entities/Product";
import BaseRepository from "./BaseRepository";

// export class ProductRepository {
//   private static instance: Repository<Product>;

//   static getInstance(): Repository<Product> {
//     if (!ProductRepository.instance) {
//       ProductRepository.instance = AppDataSource.getRepository(Product);
//     }

//     return ProductRepository.instance;
//   }
//   productRepo: Repository<Product> = ProductRepository.getInstance();

//   async create(product: Product) {
//     const newProduct = this.productRepo.create(product);
//     return this.productRepo.save(newProduct);
//   }
//   async find(
//     relations: string[] = [],
//     page: number = 1,
//     limit: number = 10,
//     where: any = {}
//   ) {
//     return await this.productRepo.find({
//       where: { ...where },
//       relations: relations,
//       take: limit,
//       skip: (page - 1) * limit,
//     });
//   }

//   async findOne(findObject: {
//     where?: any;
//     relations?: string[];
//     select?: any;
//   }) {
//     return this.productRepo.findOne(findObject);
//   }

//   async findAll(findObject: {
//     where?: any;
//     relations?: string[];
//     select?: any;
//     skip?: number;
//     take?: number;
//   }) {
//     return this.productRepo.find(findObject);
//   }

//   async delete(id: number) {
//     return this.productRepo.delete(id);
//   }

//   async save(product: Product) {
//     return this.productRepo.save(product);
//   }

//   async search(letter: string) {
//     return this.productRepo.find({
//       where: [
//         { name: Like(`%${letter}%`) },
//         { description: Like(`%${letter}%`) },
//       ],
//     });
//   }
// }

class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  async search(letter: string) {
    const where = {
      where: [
        { name: Like(`%${letter}%`) },
        { description: Like(`%${letter}%`) },
      ],
    };
    return this.entity.find(where);
  }
}
export default ProductRepository;
