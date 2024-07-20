import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Product from "./Product";
import Address from "./Address";
import Cart from "./Cart";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity("users")
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    default: Role.USER,
  })
  role!: Role;

  @Column({
    default: 0,
  })
  defaultShippingAddress!: number;
  @Column({
    default: 0,
  })
  defaultBillingAddress!: number;

  @Column()
  birthDate!: Date;

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart!: Cart;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default User;
