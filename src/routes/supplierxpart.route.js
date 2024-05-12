import {Router} from 'express'
import {getSupplierXPart, getSupplierXPartById, createSupplierXPart, updateSupplierXPart, deleteSupplierXPart} from '../controllers/supplierXpart.controller.js'


const router = Router()


/**
 * @swagger
 * /api/v1/supplierXparts:
 *   get:
 *     summary: Retorna la lista de proveedores de una parte
 *     responses:
 *       200:
 *         description: Lista de proveedores de una parte
 *     tags:
 *       - SupplierXPart    
 */
router.get('/supplierXparts', getSupplierXPart)


/**
 * @swagger
 * /api/v1/supplierXparts/{id}:
 *   get:
 *     summary: Retorna la lista proveedores de un parte por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relacion entre proveedor y las partes
 *         schema:
 *           type: string
 *     tags:
 *       - SupplierXPart
 *     responses:
 *       200:
 *         description: Proveedores de la parte encontrado
 *       404:
 *         description: Proveedores de la parte no encontrado
 */
router.get('/supplierXparts/:id', getSupplierXPartById)



/**
 * @swagger
 * /api/v1/supplierXparts:
 *   post:
 *     summary: Crea una nuevo proveedor a la parte especifica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_supplier:
 *                 type: integer
 *                 description: Proveedor del producto
 *               id_part:
 *                 type: integer
 *                 description: Parte de la empresa
 *               id_company:
 *                 type: string
 *                 description: Compañia del proveedor y de la parte
 *     tags:
 *       - SupplierXPart
 *     responses:
 *       201:
 *         description: Parte agregar al producto

 */
router.post('/supplierXparts',  createSupplierXPart)


/**
 * @swagger
 * /api/v1/supplierXparts/{id}:
 *   put:
 *     summary: Actualiza el proveedor de la parte por el id de la relacion
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relacion entre el proveedor y parte
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_supplier:
 *                 type: integer
 *                 description: Proveedor de la parte
 *               id_part:
 *                 type: integer
 *                 description: Parte de la empresa
 *               id_company:
 *                 type: string
 *                 description: Compañia del proveedor y la parte
 *     tags:
 *       - SupplierXPart
 *     responses:
 *       200:
 *         description: Proveedor de producto actualizada
 *       404:
 *         description: Proveedor del producto no encontrado
 */
router.put('/supplierXparts/:id',  updateSupplierXPart)


/**
 * @swagger
 * /api/v1/supplierXparts/{id}:
 *   delete:
 *     summary: Elimina el proveedor de la parte por el id de la relación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relación entre el proveedor y parte
 *         schema:
 *           type: string
 *     tags:
 *       - SupplierXPart
 *     responses:
 *       204:
 *         description: Proveedor del producto eliminada
 *       404:
 *         description: Proveedor del producto no encontrado
 */
router.delete('/supplierXparts/:id',  deleteSupplierXPart)



export default router