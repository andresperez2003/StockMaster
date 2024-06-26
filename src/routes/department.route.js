import {Router} from 'express'
import {getDepartment,getDepartmentById,getDepartmentByName,updateDepartment,createDepartment, deleteDepartment, getDepartmentByCountry} from '../controllers/department.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()


/**
 * @swagger
 * /api/v1/departments:
 *   get:
 *     summary: Retorna la lista de departamentos
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *     tags:
 *       - Departments    
 */
router.get('/departments',  getDepartment)

/**
 * @swagger
 * /api/v1/departments/{name}:
 *   get:
 *     summary: Retorna un departamento por su nombre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: nombre del departamento
 *         schema:
 *           type: string
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *       404:
 *         description: Departamento no encontrado
 */
router.get('/departments/name/:name',  getDepartmentByName)


/**
 * @swagger
 * /api/v1/departments/country/{country}:
 *   get:
 *     summary: Retorna los departamento de el id del pais
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: id del pais 
 *         schema:
 *           type: integer
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *       404:
 *         description: Departamento no encontrado
 */
router.get('/departments/country/:country',  getDepartmentByCountry)


/**
 * @swagger
 * /api/v1/departments/{id}:
 *   get:
 *     summary: Retorna un departamento por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del departamento
 *         schema:
 *           type: string
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *       404:
 *         description: Departamento no encontrado
 */
router.get('/departments/:id',  getDepartmentById)



/**
 * @swagger
 * /api/v1/departments:
 *   post:
 *     summary: Crea un nuevo departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del departamento
 *     tags:
 *       - Departments
 *     responses:
 *       201:
 *         description: Departamento creado

 */
router.post('/departments',  createDepartment)


/**
 * @swagger
 * /api/v1/departments/{id}:
 *   put:
 *     summary: Actualiza el departamento por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del departamento
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
 *                 description: Nombre del departamento
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: Departamento actualizado
 *       404:
 *         description: Departamento no encontrado
 */
router.put('/departments/:id',  updateDepartment)


/**
 * @swagger
 * /api/v1/departments/{id}:
 *   delete:
 *     summary: Elimina un departamento por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del departamento
 *         schema:
 *           type: string
 *     tags:
 *       - Departments
 *     responses:
 *       204:
 *         description: Departamento eliminado
 *       404:
 *         description: Departamento no encontrado
 */
router.delete('/departments/:id',   deleteDepartment)



export default router