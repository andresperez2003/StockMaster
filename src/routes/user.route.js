import {Router} from 'express'
import {getUsers, getUserById, createUser, updateUser, deleteUser, getUserByUsername, UserLogin} from '../controllers/user.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()


/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retorna la lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *     tags:
 *       - Users    
 */
router.get('/users', validateToken,  getUsers)


/**
 * @swagger
 * /api/v1/users/{identification}:
 *   get:
 *     summary: Retorna un usuario por su id
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         description: identificación del usuario
 *         schema:
 *           type: string
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:identification', validateToken,  getUserById)


/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crea un nuevo Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               lastname:
 *                 type: string
 *                 description: Apellido del usuario
 *               username:
 *                 type: string
 *                 description: Usuario para ingresar al sistema del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               status:
 *                 type: boolean
 *                 description: Estado del usuario
 *               photo:
 *                 type: string
 *                 description: Foto del usuario
 *               email:
 *                 type: string
 *                 description: Correo del usuario
 *               phone:
 *                 type: string
 *                 description: Telefono del usuario del usuario
 *               id_rol:
 *                 type: integer
 *                 description: Rol del usuario
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece el usuario
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: Usuario editado

 */
router.post('/users',  createUser)



/**
 * @swagger
 * /api/v1/users/{identification}:
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
 *                 description: Nombre del usuario
 *               lastname:
 *                 type: string
 *                 description: Apellido del usuario
 *               username:
 *                 type: string
 *                 description: Usuario para ingresar al sistema del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               status:
 *                 type: boolean
 *                 description: Estado del usuario
 *               photo:
 *                 type: string
 *                 description: Foto del usuario
 *               email:
 *                 type: string
 *                 description: Correo del usuario
 *               phone:
 *                 type: string
 *                 description: Telefono del usuario del usuario
 *               id_rol:
 *                 type: integer
 *                 description: Rol del usuario
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece el usuario
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: Usuario creado

 */
router.put('/users/:identification',  validateToken,   updateUser)



/**
 * @swagger
 * /api/v1/users/{identification}:
 *   delete:
 *     summary: Elimina un usuario por su id
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         description: id del rol
 *         schema:
 *           type: string
 *     tags:
 *       - Users
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:identification',  deleteUser)


/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Trae un usuario del sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del sistema
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario del sistema
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: Usuario encontrado

 */
router.post('/users/login', UserLogin)


export default router