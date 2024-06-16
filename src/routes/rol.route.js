import {Router} from 'express'
import {getRoles,getRolById, createRol, updateRol, deleteRol} from '../controllers/rol.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()


/**
 * @swagger
 * /api/v1/rols:
 *   get:
 *     summary: Retorna la lista de roles
 *     responses:
 *       200:
 *         description: Lista de roles
 *     tags:
 *       - Rols    
 */
router.get('/rols/:company',  getRoles)


/**
 * @swagger
 * /api/v1/rols/{id}:
 *   get:
 *     summary: Retorna un rol por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del rol
 *         schema:
 *           type: string
 *     tags:
 *       - Rols
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 */
router.get('/rols/:company/:id',  getRolById)



/**
 * @swagger
 * /api/v1/rols:
 *   post:
 *     summary: Crea un nuevo rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del rol
 *               description:
 *                 type: string
 *                 description: Descripcion del rol
 *               id_company:
 *                 type: string
 *                 description: Compañia del rol
 *     tags:
 *       - Rols
 *     responses:
 *       201:
 *         description: Rol creado

 */
router.post('/rols',   createRol)


/**
 * @swagger
 * /api/v1/rols/{id}:
 *   put:
 *     summary: Actualiza el rol por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del rol
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
 *                 description: Nombre del rol
 *               description:
 *                 type: string
 *                 description: Descripcion del rol
 *               id_company:
 *                 type: string
 *                 description: Compañia del rol
 *     tags:
 *       - Rols
 *     responses:
 *       200:
 *         description: Rol actualizado
 *       404:
 *         description: Rol no encontrado
 */7
router.put('/rols/:company/:id',   updateRol)



/**
 * @swagger
 * /api/v1/rols/{company}/{id}:
 *   delete:
 *     summary: Elimina un rol por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del rol
 *         schema:
 *           type: string
 *     tags:
 *       - Rols
 *     responses:
 *       204:
 *         description: Rol eliminado
 *       404:
 *         description: Rol no encontrado
 */
router.delete('/rols/:company/:id', deleteRol)



export default router