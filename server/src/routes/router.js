import express from "express";
import cartRouter from "./cart.router.js";
import productRouter from "./product.router.js";
import authRouter from "./auth.router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/product", productRouter);

export default router;
