import {Router} from 'express'
import {getBills, getBillsById, createBill, updateBill, deleteBill} from '../controllers/bill.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()

// Definición de seguridad para Swagger
/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /api/v1/bills:
 *   get:
 *     summary: Retorna la lista de facturas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facturas
 *     tags:
 *       - Bills    
 */
router.get('/bills/:campus', getBills)


/**
 * @swagger
 * /api/v1/bills/{id}:
 *   get:
 *     summary: Retorna una factura por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la factura
 *         schema:
 *           type: string
 *     tags:
 *       - Bills
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 */
router.get('/bills/:campus/:id', getBillsById)


/**
 * @swagger
 * /api/v1/bills:
 *   post:
 *     summary: Crea una nueva factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id de la factura
 *               date_bill:
 *                 type: string
 *                 description: fecha de la factura
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece la factura
 *               status:
 *                 type: string
 *                 description: Estado de la factura
 *               id_user:
 *                 type: string
 *                 description: Usuario que creo la factura
 *               id_client:
 *                 type: string
 *                 description: Cliente al que pertenece la factura
 *               end_date:
 *                 type: string
 *                 description: Fecha final de la factura
 *     tags:
 *       - Bills
 *     responses:
 *       201:
 *         description: Factura creada

 */
router.post('/bills',  createBill)


/**
 * @swagger
 * /api/v1/bills/{id}:
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
 *               id:
 *                 type: string
 *                 description: Id de la factura
 *               date_bill:
 *                 type: string
 *                 description: fecha de la factura
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece la factura
 *               status:
 *                 type: string
 *                 description: Estado de la factura
 *               id_user:
 *                 type: string
 *                 description: Usuario que creo la factura
 *               id_client:
 *                 type: string
 *                 description: Cliente al que pertenece la factura
 *               end_date:
 *                 type: string
 *                 description: Fecha final de la factura
 *     tags:
 *       - Bills
 *     responses:
 *       200:
 *         description: Factura actualizada
 *       404:
 *         description: Factura no encontrada
 */
router.put('/bills/:campus/:id_bill',  updateBill)


/**
 * @swagger
 * /api/v1/bills/{id}:
 *   delete:
 *     summary: Elimina una factura por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la factura
 *         schema:
 *           type: string
 *     tags:
 *       - Bills
 *     responses:
 *       204:
 *         description: Factura eliminada
 *       404:
 *         description: Factura no encontrada
 */
router.delete('/bills/:campus/:id',  deleteBill)



export default router