import Order from "../models/order.model.js.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

/**
 * Crea una orden a partir del carrito del usuario
 */
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    const newOrder = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      total,
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Error al crear orden", error: err.message });
  }
};

/**
 * Obtener las órdenes del usuario autenticado
 */
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener órdenes", error: err.message });
  }
};

/**
 * Solo admin: ver todas las órdenes
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId userId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener todas las órdenes", error: err.message });
  }
};
