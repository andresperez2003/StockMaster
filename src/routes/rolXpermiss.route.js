import {Router} from 'express'
import {getRolXPermiss, getRolXPermissById, createRolXPermiss, updateRolXPermiss, deleteRolXPermiss} from '../controllers/rolXpermiss.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/rolXpermiss/:company',  getRolXPermiss)


router.get('/rolXpermiss/:company/:id',  getRolXPermissById)


router.post('/rolXpermiss',   createRolXPermiss)


router.put('/rolXpermiss/:company/:id',   updateRolXPermiss)


router.delete('/rolXpermiss/:company/:id',  deleteRolXPermiss)



export default router