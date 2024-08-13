import {Router} from 'express'
import {getSupplierXCampus, getSupplierXCampusById, createSupplierXCampus, updateSupplierXCampus, deleteSupplierXCampus} from '../controllers/supplierXcampus.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/supplierxcampus/:campus', validateToken ,  getSupplierXCampus)


router.get('/supplierxcampus/:campus/:id', validateToken , getSupplierXCampusById)


router.post('/supplierxcampus',  validateToken ,  createSupplierXCampus)


router.put('/supplierxcampus/:id', validateToken , updateSupplierXCampus)


router.delete('/supplierxcampus/:campus/:id', validateToken  , deleteSupplierXCampus)



export default router