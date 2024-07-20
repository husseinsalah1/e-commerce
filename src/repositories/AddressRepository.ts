import { Repository } from "typeorm";
import { AppDataSource } from "../config/connection";
import Address from "../entities/Address";

export class AddRepository {
  private static instance: Repository<Address>;
  static getInstance(): Repository<Address> {
    if (!AddRepository.instance) {
      AddRepository.instance = AppDataSource.getRepository(Address);
    }

    return AddRepository.instance;
  }
  addressRepo: Repository<Address> = AddRepository.getInstance();
  async create(address: Address) {
    const newAddress = this.addressRepo.create(address);
    return this.addressRepo.save(newAddress);
  }

  async find(
    relations: string[] = [],
    skip: number = 0,
    take: number = 10,
    where: any = {}
  ) {
    return AddRepository.getInstance().find({
      where,
      relations,
      skip,
      take,
    });
  }

  async findOne(relations: string[] = [], where: any = {}) {
    return AddRepository.getInstance().findOne({
      where: where,
      relations: relations,
    });
  }
}
export default AddRepository;
