import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      const totalPrice = Number(product.price) * qty;
      cart = await cartModel.create({
        userId,
        items: [{ productId, quantity: qty }],
        totalPrice,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += qty;
      } else {
        cart.items.push({ productId, quantity: qty });
      }

      cart.totalPrice = await calculateTotal(cart.items);
      await cart.save();
    }

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");

    if (!cart) return res.status(200).json({ items: [], totalPrice: 0 });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await cartModel.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    res.status(200).json({
      success: true,
      message: "Checkout successful (mock)",
      total,
      receiptId: "RCPT-" + Math.floor(Math.random() * 100000),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
