import express from 'express'
import { OrderControllers } from './order.controller'



const router = express.Router()

// will call controller func
router.post('/create-bike', OrderControllers.createOrder)


export const OrderRoutes = router