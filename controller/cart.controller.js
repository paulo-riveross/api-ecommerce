import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

/**
 * Agrega un producto al carrito del usuario
 */
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error al agregar al carrito", error: err.message });
  }
};

/**
 * Obtiene el carrito del usuario
 */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el carrito", error: err.message });
  }
};

/**
 * Vacía el carrito del usuario
 */
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: "Carrito vaciado" });
  } catch (err) {
    res.status(500).json({ message: "Error al vaciar el carrito", error: err.message });
  }
};
