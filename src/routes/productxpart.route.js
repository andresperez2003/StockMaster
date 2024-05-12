import {Router} from 'express'
import {getProductXParts, getProductXPartById, createProductXPart, updateProductXPart, deleteProductXPart} from '../controllers/productXpart.controller.js'


const router = Router()


/**
 * @swagger
 * /api/v1/productXparts:
 *   get:
 *     summary: Retorna la lista de partes de un producto
 *     responses:
 *       200:
 *         description: Lista de partes de un producto
 *     tags:
 *       - ProductXPart    
 */
router.get('/productXparts', getProductXParts)


/**
 * @swagger
 * /api/v1/productXparts/{id}:
 *   get:
 *     summary: Retorna la lista partes de un producto por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del rol
 *         schema:
 *           type: string
 *     tags:
 *       - ProductXPart
 *     responses:
 *       200:
 *         description: Partes del producto encontrado
 *       404:
 *         description: Parte del producto no encontrado
 */
router.get('/productXparts/:id', getProductXPartById)



/**
 * @swagger
 * /api/v1/productXparts:
 *   post:
 *     summary: Crea una nueva parte al producto
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
 *                 description: Parte a agregar al producto
 *               id_company:
 *                 type: string
 *                 description: Compañia del producto y la parte
 *     tags:
 *       - ProductXPart
 *     responses:
 *       201:
 *         description: Parte agregar al producto

 */
router.post('/productXparts',  createProductXPart)


/**
 * @swagger
 * /api/v1/productXparts/{id}:
 *   put:
 *     summary: Actualiza la parte del producto por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relacion entre producto y parte
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
 *                 description: Parte a agregar al producto
 *               id_company:
 *                 type: string
 *                 description: Compañia del producto y la parte
 *     tags:
 *       - ProductXPart
 *     responses:
 *       200:
 *         description: Parte del producto actualizada
 *       404:
 *         description: Parte del producto no encontrado
 */
router.put('/productXparts/:id',  updateProductXPart)


/**
 * @swagger
 * /api/v1/productXparts/{id}:
 *   delete:
 *     summary: Elimina la parte de un producto por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la relación entre producto y parte
 *         schema:
 *           type: string
 *     tags:
 *       - ProductXPart
 *     responses:
 *       204:
 *         description: Parte del producto eliminada
 *       404:
 *         description: Parte del producto no encontrado
 */
router.delete('/productXparts/:id',  deleteProductXPart)



export default router