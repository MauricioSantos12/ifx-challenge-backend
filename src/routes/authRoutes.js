const { Router } = require("express");
const authController = require("../controllers/authController");
const validate = require("../middlewares/validate");
const { loginSchema } = require("../utils/validators");

const router = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login exitoso (JWT enviado en cookie)
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", validate(loginSchema), authController.login);

/**
 * @openapi
 * /logout:
 *   post:
 *     tags: [Auth]
 *     summary: Cerrar sesión
 *     responses:
 *       200:
 *         description: Sesión cerrada
 */
router.post("/logout", authController.logout);

module.exports = router;
