import {Router} from 'express'
import {getUnit, getUnitByName, getUnitById, updateUnit, createUnit, deleteUnit} from '../controllers/unit.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/unit/:company', validateToken ,   getUnit)


router.get('/unit/:company/:id', validateToken , getUnitById)


router.get('/unit/name/:company/:name', validateToken ,  getUnitByName)


router.post('/unit', validateToken , createUnit)


router.put('/unit/:company/:id', validateToken ,  updateUnit)


router.delete('/unit/:company/:id', validateToken  , deleteUnit)



export default router