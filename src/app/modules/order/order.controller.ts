// order.controller.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { OrderServices } from './order.service';
import OrderSchema from './order.zod.validation';
import { z } from 'zod';
import { InventoryService } from './inventory.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const zodParseData = OrderSchema.parse(orderData);

    const productId = new mongoose.Types.ObjectId(zodParseData.product);
    await InventoryService.updateInventory(
      productId.toString(),
      zodParseData.quantity,
    );

    const result = await OrderServices.createOrderIntoDB({
      ...zodParseData,
      product: productId,
    });

    res.status(200).json({
      success: true,
      message: 'Order is created successfully',
      data: result,
    });
  } catch (err) {
    handleError(err, res);
  }
};

//  error handler function
const handleError = (err: unknown, res: Response) => {
  const errorResponse = {
    success: false,
    message: 'Something went wrong',
    error: (err instanceof Error && err.message) || 'An error occurred',
    stack: (err instanceof Error && err.stack) || undefined,
  };

  if (err instanceof z.ZodError) {
    const validationErrors = err.errors.reduce((acc: any, error) => {
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
  }

  res.status(500).json(errorResponse);
};

export const OrderControllers = {
  createOrder,
};
