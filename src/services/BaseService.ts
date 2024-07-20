import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import BaseRepository from "../repositories/BaseRepository";
import e from "express";

class BaseService<T extends ObjectLiteral> {
  private repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async create(data: T) {
    return this.repository.create(data);
  }

  async findAll(findObject: { [key: string]: any }) {
    return this.repository.findAll(findObject);
  }

  async findOne(findObject: { [key: string]: any }) {
    let data = this.repository.findOne(findObject);
    if (!data) {
      return null;
    }
    return data;
  }

  async update(id: number, updatedData: T) {
    const data = await this.repository.findOne({
      where: { id },
    });

    if (!data) {
      return null;
    }

    Object.assign(data, updatedData);

    await this.repository.save(data);

    return data;
  }

  async delete(id: number) {
    const result = await this.repository.delete(id);

    return result.affected !== 0;
  }

  async save(data: T) {
    return this.repository.save(data);
  }
}

export default BaseService;
