import {Router} from 'express'
import {getCategories,getCategoryById,createCategory,deleteCategory,updateCategory} from '../controllers/category.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()


/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Retorna la lista de categorias
 *     responses:
 *       200:
 *         description: Lista de categorias
 *     tags:
 *       - Categories    
 */
router.get('/categories', validateToken,  getCategories)


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Retorna una categoria por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la categoria
 *         schema:
 *           type: string
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria no encontrada
 */
router.get('/categories/:id', validateToken,  getCategoryById)


/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Crea una nueva categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece la categoria
 *     tags:
 *       - Categories
 *     responses:
 *       201:
 *         description: Categoria creada

 */
router.post('/categories', validateToken,  createCategory)


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Actualiza una categoria por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la categoria
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
 *                 description: Nombre de la compañia
 *               id_masteruser:
 *                 type: string
 *                 description: Usermaster creador de la compañia
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categoria actualizada
 *       404:
 *         description: Categoria no encontrada
 */
router.put('/categories/:id', validateToken,   updateCategory)


/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Elimina una categoria por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la categoria
 *         schema:
 *           type: string
 *     tags:
 *       - Categories
 *     responses:
 *       204:
 *         description: Categoria eliminada
 *       404:
 *         description: Categoria no encontrada
 */
router.delete('/categories/:id', validateToken,   deleteCategory)



export default router