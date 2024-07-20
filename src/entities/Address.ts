import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity("address")
class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lineOne!: string;

  @Column()
  lineTwo!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @Column()
  pinCode!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Address;
