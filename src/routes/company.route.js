import {Router} from 'express'
import {getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany, getCompanyOnlyActive, getCompanyOnlyInactive} from '../controllers/company.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()


/**
 * @swagger
 * /api/v1/companies:
 *   get:
 *     summary: Retorna la lista de compañias
 *     responses:
 *       200:
 *         description: Lista de compañias
 *     tags:
 *       - Companies    
 */
router.get('/companies', getCompanies)

/**
 * @swagger
 * /api/v1/companies/active:
 *   get:
 *     summary: Retorna la lista de compañias activa
 *     responses:
 *       200:
 *         description: Lista de compañias activas
 *     tags:
 *       - Companies    
 */
router.get('/companies/active',  getCompanyOnlyActive)

/**
 * @swagger
 * /api/v1/companies/inactive:
 *   get:
 *     summary: Retorna la lista de compañias inactivas
 *     responses:
 *       200:
 *         description: Lista de compañias inactivas
 *     tags:
 *       - Companies    
 */
router.get('/companies/inactive',  getCompanyOnlyInactive)


/**
 * @swagger
 * /api/v1/companies/{id}:
 *   get:
 *     summary: Retorna una compañia por su nit
 *     parameters:
 *       - in: path
 *         name: nit
 *         required: true
 *         description: Nit de la empresa
 *         schema:
 *           type: string
 *     tags:
 *       - Companies
 *     responses:
 *       200:
 *         description: Compañia encontrada
 *       404:
 *         description: Compañia no encontrada
 */
router.get('/companies/:id',  getCompanyById)


/**
 * @swagger
 * /api/v1/companies:
 *   post:
 *     summary: Crea una nueva empresa  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nit:
 *                 type: string
 *                 description: Nit de la empresa
 *               name:
 *                 type: string
 *                 description: Nombre de la empresa
 *               photo:
 *                 type: string
 *                 description: Foto de la empresa
 *               address:
 *                 type: string
 *                 description: Dirección de la empresa
 *               phone:
 *                 type: string
 *                 description: Telefono de la empresa
 *               status:
 *                 type: boolean
 *                 description: Estado de la empresa
 *               id_city:
 *                 type: integer
 *                 description: Ciudad en la que se encuentra la empresa  
 *     tags:
 *       - Companies
 *     responses:
 *       201:
 *         description: Compañia creada
 */
router.post('/companies',   createCompany)


/**
 * @swagger
 * /api/v1/companies/{id}:
 *   put:
 *     summary: Actualiza una compañia por su nit
 *     parameters:
 *       - in: path
 *         name: nit
 *         required: true
 *         description: nit de la compañia
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
 *                 description: Nombre de la categoría
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *     tags:
 *       - Companies
 *     responses:
 *       200:
 *         description: Compañia actualizada
 *       404:
 *         description: Compañia no encontrad
 */
router.put('/companies/:nit',   updateCompany)


/**
 * @swagger
 * /api/v1/companies/{id}:
 *   delete:
 *     summary: Elimina una compañia por su nit
 *     parameters:
 *       - in: path
 *         name: nit
 *         required: true
 *         description: Nit de la empresa
 *         schema:
 *           type: string
 *     tags:
 *       - Companies
 *     responses:
 *       204:
 *         description: Compañia eliminada
 *       404:
 *         description: Compania no encontrada
 */
router.delete('/companies/:id',   deleteCompany)



export default router