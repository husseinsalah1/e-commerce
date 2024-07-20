import { Repository } from "typeorm";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import Address from "../entities/Address";
import BaseService from "./BaseService";

class UserService extends BaseService<User> {
  private userRepository: UserRepository = new UserRepository();
  constructor() {
    super(new UserRepository());
  }
}

export default UserService;
