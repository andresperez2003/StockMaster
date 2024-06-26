import {Router} from 'express'
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductPerCategory} from '../controllers/product.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()


/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retorna la lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *     tags:
 *       - Products    
 */
router.get('/products/:company',  getProducts)


/**
 * @swagger
 * /api/v1/products/{product}/{id}:
 *   get:
 *     summary: Retorna un product por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del producto
 *         schema:
 *           type: string
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/products/:company/:id',  getProductById)


router.get('/menu/:company', validateToken,  getProductPerCategory)


/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               price:
 *                 type: integer
 *                 format: float
 *                 description: Precio del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad disponible del producto
 *               description:
 *                 type: string
 *                 description: Descripcion del producto
 *               status:
 *                 type: boolean
 *                 description: Estado del producto
 *               photo:
 *                 type: string
 *                 description: Foto del usuario
 *               discount:
 *                 type: integer
 *                 format: float
 *                 description: Descuento del producto
 *               id_category:
 *                 type: integer
 *                 description: Categoria del producto
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece el producto
 *     tags:
 *       - Products
 *     responses:
 *       201:
 *         description: Usuario editado

 */
router.post('/products',   createProduct)



/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Actualiza el usuario por su id
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         description: id del usuario
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
 *                 description: Nombre del producto
 *               price:
 *                 type: float
 *                 description: Precio del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad disponible del producto
 *               description:
 *                 type: string
 *                 description: Descripcion del producto
 *               status:
 *                 type: boolean
 *                 description: Estado del producto
 *               photo:
 *                 type: string
 *                 description: Foto del usuario
 *               discount:
 *                 type: float
 *                 description: Descuento del producto
 *               id_category:
 *                 type: integer
 *                 description: Categoria del producto
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece el producto
 *     tags:
 *       - Products
 *     responses:
 *       201:
 *         description: Producto creado

 */
router.put('/products/:company/:id',  updateProduct)



/**
 * @swagger
 * /api/v1/products/{company}/{id}:
 *   delete:
 *     summary: Elimina un producto por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del producto
 *         schema:
 *           type: string
 *     tags:
 *       - Products
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/products/:company/:id',   deleteProduct)

export default router