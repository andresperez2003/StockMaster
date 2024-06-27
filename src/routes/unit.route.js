import {Router} from 'express'
import {getUnit, getUnitByName, getUnitById, updateUnit, createUnit, deleteUnit} from '../controllers/unit.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/unit/:company',  getUnit)


router.get('/unit/:company/:id',  getUnitById)


router.get('/unit/name/:company/:name',  getUnitByName)


router.post('/unit',  createUnit)


router.put('/unit/:company/:id',   updateUnit)


router.delete('/unit/:company/:id',   deleteUnit)



export default router