import { EntityTarget, Like, ObjectLiteral, Repository } from "typeorm";
import { AppDataSource } from "../config/connection";
import User from "../entities/User";

class BaseRepository<T extends ObjectLiteral> {
  protected entity: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = AppDataSource.getRepository(entity);
  }

  async create(data: T) {
    const newData = this.entity.create(data);
    return this.entity.save(newData);
  }

  async findOne(findObject: { [key: string]: any }): Promise<T | null> {
    return this.entity.findOne(findObject);
  }

  async findAll(findObject: { [key: string]: any }): Promise<T[]> {
    return this.entity.find(findObject);
  }

  async delete(id: number) {
    return this.entity.delete(id);
  }

  async save(data: T) {
    return this.entity.save(data);
  }
}

export default BaseRepository;
