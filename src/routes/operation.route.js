import {Router} from 'express'
import {getOperations, getOperationById, updateOperation, createOperation, deleteOperation} from '../controllers/operation.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()



router.get('/operations',  getOperations)



router.get('/operations/:id',  getOperationById)


router.post('/operations',   createOperation)


router.put('/operations/:id',   updateOperation)


router.delete('/operations/:id',  deleteOperation)



export default router