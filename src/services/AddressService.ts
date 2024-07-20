import { Request, Response } from "express";
import { addressSchema } from "../schema/users";
import User from "../entities/User";
import AddressRepository from "../repositories/AddressRepository";
import Address from "../entities/Address";

class AddressService {
  private addressRepository: any;
  constructor() {
    this.addressRepository = AddressRepository.getInstance();
  }
  async create(address: Address) {
    return this.addressRepository.create(address);
  }
  async delete(id: number) {
    const result = await this.addressRepository.delete(id);

    return result.affected !== 0;
  }

  async update(id: number, updateAddress: Address) {
    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) return null;

    Object.assign(address, updateAddress);
    return this.addressRepository.save(address);
  }

  async find(
    relations: string[] = [],
    skip: number = 0,
    take: number = 10,
    where: any = {}
  ) {
    return this.addressRepository.find({
      where,
      relations,
      skip,
      take,
    });
  }

  async findOne(relations: string[] = [], where: any = {}) {
    let address = this.addressRepository.findOne({
      where,
      relations,
    });
    if (!address) {
      return null;
    }
    return address;
  }
}

export default AddressService;
