import { Request, Response } from 'express';
import { OrderServices } from './order.service';


const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // data validation using zod
    const zodParseData = .parse(orderData);
    const result = await OrderServices.createOrderIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Bike is created successfully',
      data: result,
    });
  } catch (err: any) {
    handleError(err, res);
  }
};


export const OrderControllers = {
    createOrder,
  
  };