import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import AppDataSource from "../database/app-data-source";
import { Wallet } from "../database/entity/wallet.entity";
import { OutgoingTransfer } from "../database/entity/outgoing-transfer.entity";
import { IncomingTransfer } from "../database/entity/incoming-transfer.entity";

export default new (class WalletController {
  async makeWallet(req: Request, res: Response) {
    const newWallet = new Wallet();

    newWallet.safePin = await bcrypt.hash(req.body.wallet_pin, 10);
    await newWallet.save();

    const { safePin: safe_pin, ...walletData } = newWallet;

    res.send({ wallet: walletData });
  }

  async getWallets(req: Request, res: Response) {
    const wallets = await Wallet.find();

    const walletsData = wallets.map((wallet) => {
      const { safePin: safe_pin, ...walletData } = wallet;
      return walletData;
    });

    res.send({ wallets: walletsData });
  }

  async walletTransfer(req: Request, res: Response) {
    const { senderAccount } = req.params;
    const { receiverAccount, walletPin, amount: transferAmount } = req.body;

    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const senderWallet = await transactionalEntityManager.findOneOrFail(
        Wallet,
        {
          where: { accountNumber: senderAccount },
          lock: { mode: "pessimistic_write" },
        }
      );

      const receiverWallet = await transactionalEntityManager.findOne(Wallet, {
        where: { accountNumber: receiverAccount },
        lock: { mode: "pessimistic_write" },
      });

      if (!senderWallet) {
        return res.status(400).json({ error: "Invalid sender" });
      }

      if (!(await bcrypt.compare(walletPin, senderWallet.safePin))) {
        return res.status(400).json({ error: "Incorrect PIN" });
      }

      if (!receiverWallet) {
        return res.status(400).json({ error: "Invalid receiver" });
      }

      console.log({ bal: senderWallet, transferAmount });

      if (senderWallet.balance < transferAmount) {
        return res.status(400).json({ error: "Insufficient Wallet Balance" });
      }

      if (!Number.isInteger(transferAmount)) {
        return res.status(400).json({ error: "Invalid" });
      }

      senderWallet.balance -= transferAmount;
      receiverWallet.balance += transferAmount;

      await Promise.all([
        await transactionalEntityManager.save(Wallet, senderWallet),
        await transactionalEntityManager.save(Wallet, receiverWallet),
      ]);

      await Promise.all([
        transactionalEntityManager.insert(OutgoingTransfer, {
          amount: transferAmount,
          wallet: senderWallet,
          to: receiverWallet,
        }),
        transactionalEntityManager.insert(IncomingTransfer, {
          amount: transferAmount,
          wallet: receiverWallet,
          from: senderWallet,
        }),
      ]);

      res.json({ message: "Transfer successful" });
    }).catch((err) => {
      console.log("application error: ", err);
      res.status(400).json({ error: "Transfer failed" });
    });
  }

  doDeposit(req: Request, res: Response) {}

  doWithdrawal(req: Request, res: Response) {}
})();
