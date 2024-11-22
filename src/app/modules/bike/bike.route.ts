import express from 'express'
import { BikeControllers } from './bike.controller'


const router = express.Router()

// will call controller func
router.post('/create-bike', BikeControllers.createBike)
router.get('/:bikeName', BikeControllers.getSingleBike)
router.delete('/:bikeName', BikeControllers.deleteBike)
router.get('/', BikeControllers.getAllBikes)

export const BikeRoutes = router