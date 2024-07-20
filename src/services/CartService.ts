import { AppDataSource } from "../config/connection";
import Cart from "../entities/Cart";
import CartItem from "../entities/CartItem";
import CartRepository from "../repositories/CartRepository";
import BaseService from "./BaseService";
import ProductService from "./ProductService";
import UserService from "./UserServic";

const productService = new ProductService();
const userService = new UserService();

const cartItemRepository = AppDataSource.getRepository(CartItem);

class CartService extends BaseService<Cart> {
  cartRepository: CartRepository = new CartRepository();
  constructor() {
    super(new CartRepository());
  }

  // 1 - Check if the user has a cart.
  async checkUserCart(userId: number) {
    return await this.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  }
  // 3 -  Create a new cart if the user doesn't have one.
  async createCart(userId: number) {
    return await this.create({ user: { id: userId } } as any);
  }
  // 4 - Get or create a cart item.
  async getOrCreateCartItem(cart: any, productId: number) {
    const product = await productService.findOne({
      where: { id: productId },
    });
    if (!product) {
      return null;
    }
    return await cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
      relations: ["product"],
    });
  }
  // 5 - Add item to the cart
}

export default CartService;
