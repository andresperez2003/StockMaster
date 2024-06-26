import {Router} from 'express'
import {getCampus, getCampusById, createCampus, updateCampus, deleteCampus, getCampusByCompany, deleteCampusByCompany} from '../controllers/campus.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()


/**
 * @swagger
 * /api/v1/campus:
 *   get:
 *     summary: Retorna la lista de sedes
 *     responses:
 *       200:
 *         description: Lista de sedes
 *     tags:
 *       - Campus    
 */
router.get('/campus/:company',  getCampus)


/**
 * @swagger
 * /api/v1/campus/{id}:
 *   get:
 *     summary: Retorna una sede por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la sede
 *         schema:
 *           type: string
 *     tags:
 *       - Campus
 *     responses:
 *       200:
 *         description: Sede encontrada
 *       404:
 *         description: Sede no encontrada
 */
router.get('/campus/:id',  getCampusById)

/**
 * @swagger
 * /api/v1/campus/company/{company}:
 *   get:
 *     summary: Retorna una sede por su compañia
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la sede
 *         schema:
 *           type: string
 *     tags:
 *       - Campus
 *     responses:
 *       200:
 *         description: Sede encontrada
 *       404:
 *         description: Sede no encontrada
 */
router.get('/campus/company/:company',  getCampusByCompany)


/**
 * @swagger
 * /api/v1/campus:
 *   post:
 *     summary: Crea una nueva sede
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la sede
 *               address:
 *                 type: string
 *                 description: Direccion de la sede
 *               phone:
 *                 type: string
 *                 description: Telefono de la sede
 *               id_city:
 *                 type: integer
 *                 description: Ciudad de la sede
 *               status:
 *                 type: boolean
 *                 description: Estado de la sede
 *               main_campus:
 *                 type: boolean
 *                 description: Sede central
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece la sede
 *     tags:
 *       - Campus
 *     responses:
 *       201:
 *         description: Sede creada

 */
router.post('/campus',  createCampus)


/**
 * @swagger
 * /api/v1/campus/{id}:
 *   put:
 *     summary: Actualiza una sede por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la sede
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
 *                 description: Nombre de la sede
 *               address:
 *                 type: string
 *                 description: Direccion de la sede
 *               phone:
 *                 type: string
 *                 description: Telefono de la sede
 *               id_city:
 *                 type: int
 *                 description: Ciudad de la sede
 *               status:
 *                 type: boolean
 *                 description: Estado de la sede
 *               main_campus:
 *                 type: boolean
 *                 description: Sede central
 *               id_company:
 *                 type: string
 *                 description: Compañia a la que pertenece la sede
 *     tags:
 *       - Campus
 *     responses:
 *       200:
 *         description: Sede actualizada
 *       404:
 *         description: Sede no encontrada
 */
router.put('/campus/:company/:id',   updateCampus)


/**
 * @swagger
 * /api/v1/campus/{id}:
 *   delete:
 *     summary: Elimina una sede por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la sede
 *         schema:
 *           type: string
 *     tags:
 *       - Campus
 *     responses:
 *       204:
 *         description: Sede eliminada
 *       404:
 *         description: Sede no encontrada
 */
router.delete('/campus/:id',   deleteCampus)


/**
 * @swagger
 * /api/v1/campus/{company}/{id}:
 *   delete:
 *     summary: Elimina una sede por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id de la sede
 *         schema:
 *           type: string
 *     tags:
 *       - Campus
 *     responses:
 *       204:
 *         description: Sede eliminada
 *       404:
 *         description: Sede no encontrada
 */
router.delete('/campus/:company/:id', deleteCampusByCompany)



export default router