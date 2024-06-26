import {Router} from 'express'
import {getProductXSupplier, getProductXSupplierById, updateProductXSupplier, createProductXSupplier, deleteProductXSupplier} from '../controllers/productXsupplier.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()


/**
 * @swagger
 * /api/v1/productXsupplier:
 *   get:
 *     summary: Retorna la lista de proveedores de un producto
 *     responses:
 *       200:
 *         description: Lista de proveedores de un producto
 *     tags:
 *       - ProductXSupplier   
 */
router.get('/productXsupplier/:campus',  getProductXSupplier)


/**
 * @swagger
 * /api/v1/productXsupplier/{id}:
 *   get:
 *     summary: Retorna la lista proveedores de un producto por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relacion entre proveedor y producto
 *         schema:
 *           type: string
 *     tags:
 *       - ProductXSupplier
 *     responses:
 *       200:
 *         description: Proveedor del producto encontrado
 *       404:
 *         description: Proveedor del producto no encontrado
 */
router.get('/productXsupplier/:campus/:id',  getProductXSupplierById)



/**
 * @swagger
 * /api/v1/productXsupplier:
 *   post:
 *     summary: Crea una proveedor al producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *                 description: Producto asociado
 *               id_supplier:
 *                 type: integer
 *                 description: Proveedor del producto
 *               id_company:
 *                 type: string
 *                 description: Compañia del producto y el proveedor
 *     tags:
 *       - ProductXSupplier
 *     responses:
 *       201:
 *         description: Proveedor agregado al producto

 */
router.post('/productXsupplier',   createProductXSupplier)


/**
 * @swagger
 * /api/v1/productXsupplier/{id}:
 *   put:
 *     summary: Actualiza el proveedor del producto por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relacion entre producto y proveedor
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *                 description: Producto asociado
 *               id_part:
 *                 type: integer
 *                 description: Proveedor del producto
 *               id_company:
 *                 type: string
 *                 description: Compañia del producto y el proveedor
 *     tags:
 *       - ProductXSupplier
 *     responses:
 *       200:
 *         description: Proveedor del producto actualizada
 *       404:
 *         description: Proveedor del producto no encontrado
 */
router.put('/productXsupplier/:campus/:id',  updateProductXSupplier)


/**
 * @swagger
 * /api/v1/productXsupplier/{id}:
 *   delete:
 *     summary: Elimina el proveedor de un producto por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relación entre producto y proveedor
 *         schema:
 *           type: string
 *     tags:
 *       - ProductXSupplier
 *     responses:
 *       204:
 *         description: Proveedor del producto eliminada
 *       404:
 *         description: Proveedor del producto no encontrado
 */
router.delete('/productXsupplier/:campus/:id',  deleteProductXSupplier)



export default router