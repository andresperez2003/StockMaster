import {Router} from 'express'
import {getModuleXCompany, getModuleXCompanyById, createModuleXCompany, updateModuleXCompany, deleteModuleXCompany} from '../controllers/moduleXcompany.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/modulexcompany/:company',  getModuleXCompany)



router.get('/modulexcompany/:company/:id',  getModuleXCompanyById)


router.post('/modulexcompany',   createModuleXCompany)


router.put('/modulexcompany/:company/:id',   updateModuleXCompany)


router.delete('/modulexcompany/:company/:id',  deleteModuleXCompany)



export default router