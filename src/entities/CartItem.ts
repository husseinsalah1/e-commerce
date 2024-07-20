import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import Product from "./Product";
import Cart from "./Cart";

@Entity("cart_items")
class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: 0,
  })
  quantity!: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart!: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product!: Product;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default CartItem;
