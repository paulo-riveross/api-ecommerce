import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/order.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gestión de órdenes
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una orden a partir del carrito
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Orden creada con éxito
 *       400:
 *         description: Carrito vacío
 */
router.post("/", auth, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener órdenes del usuario autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes del usuario
 *       500:
 *         description: Error al obtener órdenes
 */
router.get("/", auth, getUserOrders);

/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Obtener todas las órdenes (solo admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las órdenes
 *       403:
 *         description: No autorizado
 */
router.get("/all", auth, isAdmin, getAllOrders);

export default router;
