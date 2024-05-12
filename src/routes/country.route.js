import {Router} from 'express'
import {getCountries,getCountryById,deleteCountry,createCountry,updateCountry, getCountryByName} from '../controllers/country.controller.js'


const router = Router()


/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     summary: Retorna la lista de paises
 *     responses:
 *       200:
 *         description: Lista de paises
 *     tags:
 *       - Countries    
 */
router.get('/countries', getCountries)


/**
 * @swagger
 * /api/v1/countries/{id}:
 *   get:
 *     summary: Retorna un pais por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del pais
 *         schema:
 *           type: string
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: Pais encontrado
 *       404:
 *         description: Pais no encontrado
 */
router.get('/countries/:id', getCountryById)


/**
 * @swagger
 * /api/v1/countries/{name}:
 *   get:
 *     summary: Retorna un pais por su nombre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: nombre del pais
 *         schema:
 *           type: string
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: Pais encontrado
 *       404:
 *         description: Pais no encontrado
 */
router.get('/countries/:name', getCountryByName)



/**
 * @swagger
 * /api/v1/countries:
 *   post:
 *     summary: Crea un nuevo pais
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del pais
 *     tags:
 *       - Countries
 *     responses:
 *       201:
 *         description: Pais creado

 */
router.post('/countries',  createCountry)


/**
 * @swagger
 * /api/v1/countries/{id}:
 *   put:
 *     summary: Actualiza el pais por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del pais
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
 *                 description: Nombre del pais
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: Pais actualizado
 *       404:
 *         description: Pais no encontrado
 */
router.put('/countries/:id',  updateCountry)


/**
 * @swagger
 * /api/v1/countries/{id}:
 *   delete:
 *     summary: Elimina un pais por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del pais
 *         schema:
 *           type: string
 *     tags:
 *       - Countries
 *     responses:
 *       204:
 *         description: Pais eliminado
 *       404:
 *         description: Pais no encontrado
 */
router.delete('/countries/:id',  deleteCountry)



export default router