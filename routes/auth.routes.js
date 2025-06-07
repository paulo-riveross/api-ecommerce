import express from "express";
import { register, login, getProfile } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestión de autenticación y usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paulo
 *               email:
 *                 type: string
 *                 example: paulo@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Correo ya registrado
 *       500:
 *         description: Error del servidor
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: paulo@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve token JWT y datos del usuario
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil del usuario (sin contraseña)
 *       401:
 *         description: No autorizado, token inválido o faltante
 *       500:
 *         description: Error del servidor
 */
router.get("/profile", auth, getProfile);

export default router;
