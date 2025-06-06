import express from "express";
import { addToCart, getCart, clearCart } from "../controllers/cart.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Endpoints para gestión del carrito de compras
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtener el carrito del usuario
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido con éxito
 *       404:
 *         description: Carrito no encontrado
 */
router.get("/", auth, getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *       500:
 *         description: Error interno
 */
router.post("/", auth, addToCart);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Vaciar el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito vaciado con éxito
 *       500:
 *         description: Error interno
 */
router.delete("/", auth, clearCart);

export default router;
