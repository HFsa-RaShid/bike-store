import express from 'express';
import { BikeControllers } from './bike.controller';

const router = express.Router();

// will call controller func
router.post('/create-bike', BikeControllers.createBike);
router.get('/:productId', BikeControllers.getSingleBike);
router.put('/:productId', BikeControllers.updateBike);
router.delete('/:productId', BikeControllers.deleteBike);
router.get('/', BikeControllers.getAllBikes);

export const BikeRoutes = router;
