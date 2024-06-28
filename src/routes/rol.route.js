import {Router} from 'express'
import {getRoles, createRol, updateRol, deleteRol, getRolByParameters, getRolById} from '../controllers/rol.controller.js'
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
router.get('/rols/:company', validateToken, getRoles)



router.get('/rols/parameters/:company/:name', validateToken,  getRolByParameters)


router.get('/rols/:company/:id', validateToken, getRolById)

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
router.post('/rols',  validateToken ,   createRol)


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
router.put('/rols/:company/:id', validateToken ,   updateRol)



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