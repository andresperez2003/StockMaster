import {Router} from 'express'
import {getParts, getPartById, createPart, updatePart, deletePart} from '../controllers/part.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()


/**
 * @swagger
 * /api/v1/parts:
 *   get:
 *     summary: Retorna la lista de partes
 *     responses:
 *       200:
 *         description: Lista de partes
 *     tags:
 *       - Parts    
 */
router.get('/parts/:company',  getParts)


/**
 * @swagger
 * /api/v1/parts/{id}:
 *   get:
 *     summary: Retorna una parte por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la parte
 *         schema:
 *           type: string
 *     tags:
 *       - Parts
 *     responses:
 *       200:
 *         description: Parte encontrado
 *       404:
 *         description: Parte no encontrado
 */
router.get('/parts/:company/:id',  getPartById)



/**
 * @swagger
 * /api/v1/parts:
 *   post:
 *     summary: Crea una nueva parte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la parte
 *               quantity:
 *                 type: integer
 *                 description: Cantidad diponible de la parte
 *               price:
 *                 type: integer
 *                 format: float
 *                 description: Precio de la parte
 *               unit:
 *                 type: string
 *                 description: Unidad de la parte
 *               photo:
 *                 type: string
 *                 description: Foto de la parte
 *               id_company:
 *                 type: string
 *                 description: Compañia del rol
 *     tags:
 *       - Parts
 *     responses:
 *       201:
 *         description: Parte creado

 */
router.post('/parts',   createPart)


/**
 * @swagger
 * /api/v1/parts/{id}:
 *   put:
 *     summary: Actualiza la parte por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la parte
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
 *                 description: Nombre de la parte
 *               quantity:
 *                 type: integer
 *                 description: Cantidad diponible de la parte
 *               price:
 *                 type: integer
 *                 format: float
 *                 description: Precio de la parte
 *               photo:
 *                 type: string
 *                 description: Foto de la parte
 *     tags:
 *       - Parts
 *     responses:
 *       200:
 *         description: Parte actualizada
 *       404:
 *         description: Parte no encontrada
 */
router.put('/parts/:company/:id',   updatePart)


/**
 * @swagger
 * /api/v1/parts/{id}:
 *   delete:
 *     summary: Elimina una parte por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la parte
 *         schema:
 *           type: string
 *     tags:
 *       - Parts
 *     responses:
 *       204:
 *         description: Parte eliminada
 *       404:
 *         description: Parte no encontrada
 */
router.delete('/parts/:company/:id',   deletePart)



export default router