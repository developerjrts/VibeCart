import express from "express";
import protectRoute from "../middlewares/protect.route.js";
import * as cartController from "../controllers/cart.controller.js";
const cartRouter = express.Router();

cartRouter.route("/").post(protectRoute, cartController.addToCart);
cartRouter.route("/").get(protectRoute, cartController.getCart);
cartRouter.route("/").delete(protectRoute, cartController.clearCart);
cartRouter.route("/checkout").post(protectRoute, cartController.checkout);

export default cartRouter;
