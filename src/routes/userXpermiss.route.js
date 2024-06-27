import {Router} from 'express'
import {getUserXPermiss, getUserXPermissById, createUserXPermiss, updateUserXPermiss, deleteUserXPermiss} from '../controllers/userXpermiss.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/userxpermiss/:company',  getUserXPermiss)


router.get('/userxpermiss/:company/:id',  getUserXPermissById)


router.post('/userxpermiss',   createUserXPermiss)


router.put('/userxpermiss/:company/:id',   updateUserXPermiss)


router.delete('/userxpermiss/:company/:id',  deleteUserXPermiss)



export default router