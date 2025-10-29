import productModel from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock } = req.body;
    const user = req.user;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    if (!user.isAdmin) {
      return res.status(402).json({
        status: false,
        message: "Only admin can add products.",
      });
    }

    const newProduct = new productModel({
      name,
      description,
      category,
      price,
      stock,
      poster: req.file.path,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      status: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
