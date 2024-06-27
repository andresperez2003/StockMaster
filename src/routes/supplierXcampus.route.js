import {Router} from 'express'
import {getSupplierXCampus, getSupplierXCampusById, createSupplierXCampus, updateSupplierXCampus, deleteSupplierXCampus} from '../controllers/supplierXcampus.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/supplierxcampus',  getSupplierXCampus)


router.get('/supplierxcampus/:id',  getSupplierXCampusById)


router.post('/supplierxcampus',   createSupplierXCampus)


router.put('/supplierxcampus/:id',   updateSupplierXCampus)


router.delete('/supplierxcampus/:id',  deleteSupplierXCampus)



export default router