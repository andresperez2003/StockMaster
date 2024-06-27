import {Router} from 'express'
import {getPermiss, getPermissById, createPermiss, updatePermiss, deletePermiss} from '../controllers/permiss.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/permisses/:company',  getPermiss)


router.get('/permisses/:company/:id',  getPermissById)


router.post('/permisses',   createPermiss)


router.put('/permisses/:company/:id',   updatePermiss)


router.delete('/permisses/:company/:id',  deletePermiss)



export default router