import {Router} from 'express'
import {getCities, getCityById, getCityByName, getCityByDepartment, createCity, updateCity, deleteCity} from '../controllers/city.controller.js'


const router = Router()


/**
 * @swagger
 * /api/v1/cities:
 *   get:
 *     summary: Retorna la lista de ciudades
 *     responses:
 *       200:
 *         description: Lista de ciudades
 *     tags:
 *       - Cities    
 */
router.get('/cities', getCities)

/**
 * @swagger
 * /api/v1/cities/{name}:
 *   get:
 *     summary: Retorna una ciudad por su nombre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: nombre de la ciudad
 *         schema:
 *           type: string
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Ciudad encontrada
 *       404:
 *         description: Ciudad no encontrada
 */
router.get('/cities/:name', getCityByName)


/**
 * @swagger
 * /api/v1/cities/department/{department}:
 *   get:
 *     summary: Retorna las ciudades con el id del departamento
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         description: id del departamento 
 *         schema:
 *           type: integer
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Ciudad encontrada
 *       404:
 *         description: Ciudad no encontrada
 */
router.get('/cities/department/:department', getCityByDepartment)


/**
 * @swagger
 * /api/v1/cities/{id}:
 *   get:
 *     summary: Retorna una ciudad por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la ciudad
 *         schema:
 *           type: string
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Ciudad encontrada
 *       404:
 *         description: Ciudad no encontrada
 */
router.get('/cities/:id', getCityById)



/**
 * @swagger
 * /api/v1/cities:
 *   post:
 *     summary: Crea una nueva ciudad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la ciudad
 *               id_department:
 *                 type: string
 *                 description: Departamento de la ciudad
 *     tags:
 *       - Cities
 *     responses:
 *       201:
 *         description: Ciudad creada

 */
router.post('/cities',  createCity)


/**
 * @swagger
 * /api/v1/cities/{id}:
 *   put:
 *     summary: Actualiza la ciudad por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la ciudad
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
 *                 description: Nombre de la ciudad
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Ciudad actualizada
 *       404:
 *         description: Ciudad no encontrada
 */
router.put('/cities/:id',  updateCity)


/**
 * @swagger
 * /api/v1/cities/{id}:
 *   delete:
 *     summary: Elimina una ciudad por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la ciudad
 *         schema:
 *           type: string
 *     tags:
 *       - Cities
 *     responses:
 *       204:
 *         description: Ciudad eliminada
 *       404:
 *         description: Ciudad no encontrada
 */
router.delete('/cities/:id',  deleteCity)



export default router