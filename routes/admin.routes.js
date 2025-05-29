import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/admin.controller.js";
import { auth } from "../middleware/auth.js";
import { authorizeRole } from "../middleware/roles.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestión de usuarios para administradores
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get("/", auth, authorizeRole("admin"), getAllUsers);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Obtener usuario por ID (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", auth, authorizeRole("admin"), getUserById);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Actualizar usuario por ID (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       description: Datos para actualizar (name, email, role, password)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", auth, authorizeRole("admin"), updateUser);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", auth, authorizeRole("admin"), deleteUser);

export default router;
