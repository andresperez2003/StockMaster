import {Router} from 'express'
import {getStatusBill, getStatusBillById, getStatusBillByName, createStatusBill, updateStatusBill,deleteStatusBill} from '../controllers/statusBill.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/statusBill/:company', validateToken , getStatusBill)


router.get('/statusBill/:company/:id', validateToken  , getStatusBillById)


router.get('/statusBill/name/:company/:name', validateToken , getStatusBillByName)


router.post('/statusBill',  validateToken ,  createStatusBill)


router.put('/statusBill/:company/:id',  validateToken  , updateStatusBill)


router.delete('/statusBill/:company/:id',  validateToken , deleteStatusBill)



export default router