import {Router} from 'express'
import {getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier} from '../controllers/supplier.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()


/**
 * @swagger
 * /api/v1/suppliers:
 *   get:
 *     summary: Retorna la lista de Proveedores
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *     tags:
 *       - Suppliers    
 */
router.get('/suppliers/:company', getSuppliers)


/**
 * @swagger
 * /api/v1/suppliers/{company}/{id}:
 *   get:
 *     summary: Retorna un proveedor por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del proveedor
 *         schema:
 *           type: string
 *     tags:
 *       - Suppliers
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 */
router.get('/suppliers/:company/:id',  getSupplierById)



/**
 * @swagger
 * /api/v1/suppliers:
 *   post:
 *     summary: Crea un nuevo Proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del proveedor
 *               phone:
 *                 type: string
 *                 description: Telefono del proveedor
 *               name_seller:
 *                 type: string
 *                 description: Nombre del vendedor
 *               photo:
 *                 type: string
 *                 description: Foto del proveedor
 *               id_company:
 *                 type: string
 *                 description: Compañia del proveedor
 *     tags:
 *       - Suppliers
 *     responses:
 *       201:
 *         description: Proveedor creado

 */
router.post('/suppliers',   createSupplier)


/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   put:
 *     summary: Actualiza el proveedor por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del proveedor
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del proveedor
 *               phone:
 *                 type: string
 *                 description: Telefono del proveedor
 *               name_seller:
 *                 type: string
 *                 description: Nombre del vendedor
 *               photo:
 *                 type: string
 *                 description: Foto del proveedor
 *               id_company:
 *                 type: string
 *                 description: Compañia del proveedor
 *     tags:
 *       - Suppliers
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       404:
 *         description: Proveedor no encontrado
 */
router.put('/suppliers/:company/:id',   updateSupplier)


/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   delete:
 *     summary: Elimina un proveedor por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del proveedor
 *         schema:
 *           type: string
 *     tags:
 *       - Suppliers
 *     responses:
 *       204:
 *         description: Proveedor eliminado
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete('/suppliers/:company/:id',  deleteSupplier)



export default router