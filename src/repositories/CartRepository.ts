import { Repository } from "typeorm";
import { AppDataSource } from "../config/connection";
import Cart from "../entities/Cart";
import BaseRepository from "./BaseRepository";

export default class CartRepository extends BaseRepository<Cart> {
  constructor() {
    super(Cart);
  }
}
