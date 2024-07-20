import { AppDataSource } from "../config/connection";
import User from "../entities/User";
import BaseRepository from "./BaseRepository";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}

export default UserRepository;
