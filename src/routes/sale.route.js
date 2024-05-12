import {Router} from 'express'
import {getSales, getSaleById, updateSale, createSale, deleteSale} from '../controllers/sale.controller.js'


const router = Router()


/**
 * @swagger
 * /api/v1/sales:
 *   get:
 *     summary: Retorna la lista de ventas
 *     responses:
 *       200:
 *         description: Lista de ventas
 *     tags:
 *       - Sales    
 */
router.get('/sales', getSales)


/**
 * @swagger
 * /api/v1/sales/{id}:
 *   get:
 *     summary: Retorna una venta por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la venta
 *         schema:
 *           type: string
 *     tags:
 *       - Sales
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 */
router.get('/sales/:id', getSaleById)


/**
 * @swagger
 * /api/v1/sales:
 *   post:
 *     summary: Crea una nueva venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_roduct:
 *                 type: string
 *                 description: Producto de la venta
 *               quantity:
 *                 type: string
 *                 description: Cantidad a vender del producto
 *               id_bill:
 *                 type: string
 *                 description: Factura a la que pertenece la venta
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece la venta
 *     tags:
 *       - Sales
 *     responses:
 *       201:
 *         description: Venta creada

 */
router.post('/sales', createSale)


/**
 * @swagger
 * /api/v1/sales/{id}:
 *   put:
 *     summary: Actualiza una factura por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la factura
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_roduct:
 *                 type: string
 *                 description: Producto de la venta
 *               quantity:
 *                 type: string
 *                 description: Cantidad a vender del producto
 *               id_bill:
 *                 type: string
 *                 description: Factura a la que pertenece la venta
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece la venta
 *     tags:
 *       - Sales
 *     responses:
 *       200:
 *         description: Venta actualizada
 *       404:
 *         description: Venta no encontrada
 */
router.put('/sales/:id',  updateSale)


/**
 * @swagger
 * /api/v1/sales/{id}:
 *   delete:
 *     summary: Elimina una venta por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la venta
 *         schema:
 *           type: string
 *     tags:
 *       - Sales
 *     responses:
 *       204:
 *         description: Venta eliminada
 *       404:
 *         description: Venta no encontrada
 */
router.delete('/sales/:id',  deleteSale)



export default router