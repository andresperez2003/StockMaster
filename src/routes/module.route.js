import {Router} from 'express'
import {getModules, getModuleById, createModule, updateModule, deleteModule} from '../controllers/module.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/modules',  getModules)



router.get('/modules/:id',  getModuleById)


router.post('/modules',   createModule)


router.put('/modules/:id',   updateModule)


router.delete('/modules/:id',  deleteModule)



export default router