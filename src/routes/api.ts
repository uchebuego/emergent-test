import { Router } from "express";
import walletController from "../controllers/wallet.controller";

const router = Router();

router.post("/wallet", walletController.makeWallet);

router.get("/wallet/all", walletController.getWallets);

router.post("/wallet/:senderAccount/transfer", walletController.walletTransfer);

router.post("/wallet/:accountNumber/withdraw", walletController.doWithdrawal);

router.post("/wallet/:accountNumber/deposit", walletController.doDeposit);

export default router;
