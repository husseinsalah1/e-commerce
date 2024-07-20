import { Repository } from "typeorm";
import CartItem from "../entities/CartItem";
import { AppDataSource } from "../config/connection";
import BaseRepository from "./BaseRepository";

class Cart_ItemRepository extends BaseRepository<CartItem> {
  constructor() {
    super(CartItem);
  }
}

export default Cart_ItemRepository;
