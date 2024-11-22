import express from 'express'
import { BikeControllers } from './bike.controller'


const router = express.Router()

// will call controller func
router.post('/create-bike', BikeControllers.createBike)
// router.get('/:studentId', StudentControllers.getSingleStudent)
// router.delete('/:studentId', StudentControllers.deleteStudent)
// router.get('/', StudentControllers.getAllStudents)

export const BikeRoutes = router