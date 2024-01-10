import {
  ChildEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Wallet } from "./wallet.entity";
import { Transaction } from "./transaction.entity";

@ChildEntity()
export class IncomingTransfer extends Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Wallet)
  from: Wallet;
}
