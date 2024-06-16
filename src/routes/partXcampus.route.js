import {Router} from 'express'
import {getPartXCampus, getPartXCampusById, createPartXCampus, updatePartXCampus, deletePartXCampus} from '../controllers/partXcampus.controller.js'
import {validateToken} from '../middleware/verifyToken.js'

const router = Router()



router.get('/partxcampus',  getPartXCampus)


router.get('/partxcampus/:id',  getPartXCampusById)


router.post('/partxcampus',   createPartXCampus)


router.put('/partxcampus/:id',   updatePartXCampus)


router.delete('/partxcampus/:id',  deletePartXCampus)



export default router