import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import CartItem from "./CartItem";

@Entity("cart")
class Cart {
  // Add properties here
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.cart, { onDelete: "CASCADE" })
  @JoinColumn()
  user!: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  items!: CartItem[];
}

export default Cart;
