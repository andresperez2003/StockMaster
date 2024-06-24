import {Router} from 'express'
import {getStatusBill, getStatusBillById, getStatusBillByName, createStatusBill, updateStatusBill,deleteStatusBill} from '../controllers/statusBill.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/statusBill/:company',  getStatusBill)


router.get('/statusBill/:company/:id',  getStatusBillById)


router.get('/statusBill/name/:company/:name',  getStatusBillByName)


router.post('/statusBill',  createStatusBill)


router.put('/statusBill/:company/:id',   updateStatusBill)


router.delete('/statusBill/:company/:id',   deleteStatusBill)



export default router