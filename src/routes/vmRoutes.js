const { Router } = require("express");
const vmController = require("../controllers/vmController");
const { authenticate, authorize } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { createVmSchema, updateVmSchema } = require("../utils/validators");

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /vms:
 *   get:
 *     tags: [VMs]
 *     summary: Listar todas las VMs activas
 *     responses:
 *       200:
 *         description: Lista de VMs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VM'
 *       401:
 *         description: No autenticado
 */
router.get("/", vmController.findAll);

/**
 * @openapi
 * /vms/{id}:
 *   get:
 *     tags: [VMs]
 *     summary: Obtener VM por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: VM encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VM'
 *       404:
 *         description: VM no encontrada
 */
router.get("/:id", vmController.findById);

/**
 * @openapi
 * /vms:
 *   post:
 *     tags: [VMs]
 *     summary: Crear una VM (Solo Admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVM'
 *     responses:
 *       201:
 *         description: VM creada
 *       403:
 *         description: No autorizado
 */
router.post(
  "/",
  authorize("Admin"),
  validate(createVmSchema),
  vmController.create
);

/**
 * @openapi
 * /vms/{id}:
 *   put:
 *     tags: [VMs]
 *     summary: Actualizar una VM (Solo Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVM'
 *     responses:
 *       200:
 *         description: VM actualizada
 *       404:
 *         description: VM no encontrada o eliminada
 */
router.put(
  "/:id",
  authorize("Admin"),
  validate(updateVmSchema),
  vmController.update
);

/**
 * @openapi
 * /vms/{id}:
 *   delete:
 *     tags: [VMs]
 *     summary: Eliminar VM - soft delete (Solo Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: VM eliminada correctamente
 *       404:
 *         description: VM no encontrada o ya eliminada
 */
router.delete("/:id", authorize("Admin"), vmController.remove);

module.exports = router;
