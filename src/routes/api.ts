import { Router } from "express";
import walletController from "../controllers/wallet.controller";

const router = Router();

router.post("/wallet", walletController.makeWallet);

router.get("/wallet/all", walletController.getWallets);

router.post("/wallet/:senderAccount/transfer", walletController.walletTransfer);

router.post("/wallet/:accountNumber/withdraw", walletController.makeWallet);

router.post("/wallet/:accountNumber/deposit", walletController.makeWallet);

export default router;
