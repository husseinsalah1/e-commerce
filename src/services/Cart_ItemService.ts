import CartItem from "../entities/CartItem";
import Cart_ItemRepository from "../repositories/Cart_ItemRepository";
import BaseService from "./BaseService";

class Cart_ItemService extends BaseService<CartItem> {
  cart_ItemRepository: Cart_ItemRepository = new Cart_ItemRepository();
  constructor() {
    super(new Cart_ItemRepository());
  }
}

export default Cart_ItemService;
