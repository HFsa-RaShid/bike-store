// import { Request, Response } from 'express';
// import { OrderServices } from './order.service';
// import OrderSchema from './order.zod.validation';
// import { z } from 'zod';


// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { order: orderData } = req.body;

//     // data validation using zod
//     const zodParseData = OrderSchema.parse(orderData);
//     const result = await OrderServices.createOrderIntoDB(zodParseData);

//     res.status(200).json({
//       success: true,
//       message: 'Bike is created successfully',
//       data: result,
//     });
//   } catch (err: any) {
//     handleError(err, res);
//   }
// };



import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { OrderServices } from './order.service';
import OrderSchema from './order.zod.validation';
import { z } from 'zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // Data validation using Zod
    const zodParseData = OrderSchema.parse(orderData);

    // Convert product to ObjectId
    const validatedOrderData = {
      ...zodParseData,
      product: new mongoose.Types.ObjectId(zodParseData.product),
    };

    const result = await OrderServices.createOrderIntoDB(validatedOrderData);

    res.status(200).json({
      success: true,
      message: 'Order is created successfully',
      data: result,
    });
  } catch (err: any) {
    handleError(err, res);
  }
};


//  error handler function
const handleError = (err: any, res: Response) => {
    let errorResponse: any = {
      success: false,
      message: 'Something went wrong',
      error: err.message || 'An error occurred',
      stack: err.stack,
    };
  
    if (err instanceof z.ZodError) {
      const validationErrors = err.errors.reduce((acc: any, error: any) => {
        acc[error.path[0]] = {
          message: error.message,
          name: 'ValidatorError',
          properties: {
            message: error.message,
            type: error.code,
          },
          kind: error.code,
          path: error.path[0],
        };
        return acc;
      }, {});
  
      errorResponse.message = 'Validation failed';
      errorResponse.error = validationErrors;
    } else if (err instanceof Error) {
      errorResponse.message = err.message || 'An unexpected error occurred';
      errorResponse.error = err;
    }
  
    res.status(err.status || 500).json(errorResponse);
  };


export const OrderControllers = {
    createOrder,
  
  };