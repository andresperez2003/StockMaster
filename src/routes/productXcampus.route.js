import {Router} from 'express'
import {getProductXCampus, getProductXCampusById, updateProductXCampus, createProductXCampus, deleteProductXCampus} from '../controllers/productXcampus.controller.js'
import {validateToken} from '../middleware/token.js'

const router = Router()



router.get('/productxcampus',  getProductXCampus)


router.get('/productxcampus/:id',  getProductXCampusById)


router.post('/productxcampus',   createProductXCampus)


router.put('/productxcampus/:id',   updateProductXCampus)


router.delete('/productxcampus/:id',  deleteProductXCampus)



export default router