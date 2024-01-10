import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet: Wallet;

  @Column({ type: "int" })
  amount: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;
}
