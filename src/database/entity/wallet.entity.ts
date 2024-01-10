import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "char", length: 10, unique: true })
  accountNumber: string;

  @Column({ type: "int", default: 0 })
  balance: number;

  @Column()
  safePin: string;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet, {
    eager: true,
  })
  transactions: Transaction[];

  @BeforeInsert()
  makeWalletNumber() {
    this.accountNumber = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(10, "0");
  }
}
