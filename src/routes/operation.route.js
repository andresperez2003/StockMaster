import {Router} from 'express'
import {getOperations, getOperationById, createOperation, updateOperations, deleteOperations} from '../controllers/operation.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/operations',  getOperations)



router.get('/operations/:id',  getOperationById)


router.post('/operations',   createOperation)


router.put('/operations/:id',   updateOperations)


router.delete('/operations/:id',  deleteOperations)



export default router