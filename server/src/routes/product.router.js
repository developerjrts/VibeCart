import express from "express";
import protectRoute from "../middlewares/protect.route.js";
import upload from "../lib/cloudinary.js";
import * as productController from "../controllers/product.controller.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .post(protectRoute, upload.single("image"), productController.addProduct);

productRouter.route("/").get(protectRoute, productController.getProducts);
productRouter
  .route("/:productId")
  .get(protectRoute, productController.getProductById);

export default productRouter;
