import {Router} from 'express'
import {getClients, getClientById, createClient, updateClient, deleteClient} from '../controllers/client.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()


/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Retorna la lista de clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 *     tags:
 *       - Clients    
 */
router.get('/clients/:company', getClients)


/**
 * @swagger
 * /api/v1/clients/{identification}:
 *   get:
 *     summary: Retorna un cliente por su id
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         description: identificación del cliente
 *         schema:
 *           type: string
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/clients/:company/:identification', getClientById)


/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Crea un nuevo Cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification:
 *                 type: string
 *                 description: Identificacion del cliente
 *               name:
 *                 type: string
 *                 description: Nombre del cliente
 *               lastname:
 *                 type: string
 *                 description: Apellido del cliente
 *               status:
 *                 type: boolean
 *                 description: Estado del cliente
 *               email:
 *                 type: string
 *                 description: Correo del cliente
 *               phone:
 *                 type: string
 *                 description: Telefono del cliente
 *               address:
 *                 type: string
 *                 description: Dirección del cliente
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece el cliente
 *               id_city:
 *                 type: string
 *                 description: Ciudad a la que pertenece el cliente
 *     tags:
 *       - Clients
 *     responses:
 *       201:
 *         description: Usuario editado

 */
router.post('/clients',   createClient)



/**
 * @swagger
 * /api/v1/clients/{identification}:
 *   put:
 *     summary: Actualiza el cliente por su id
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         description: id del cliente
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
 *                 description: Nombre del cliente
 *               lastname:
 *                 type: string
 *                 description: Apellido del cliente
 *               status:
 *                 type: boolean
 *                 description: Estado del cliente
 *               email:
 *                 type: string
 *                 description: Correo del cliente
 *               phone:
 *                 type: string
 *                 description: Telefono del cliente
 *               address:
 *                 type: string
 *                 description: Dirección del cliente
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece el cliente
 *               id_city:
 *                 type: string
 *                 description: Ciudad a la que pertenece el cliente
 *     tags:
 *       - Clients
 *     responses:
 *       201:
 *         description: Cliente actualizado

 */
router.put('/clients/:identification',  updateClient)



/**
 * @swagger
 * /api/v1/clients/{identification}:
 *   delete:
 *     summary: Elimina un cliente por su id
 *     parameters:
 *       - in: path
 *         name: identification
 *         required: true
 *         description: id del cliente
 *         schema:
 *           type: string
 *     tags:
 *       - Clients
 *     responses:
 *       204:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/clients/:company/:identification',   deleteClient)

export default router