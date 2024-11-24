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

const handleError = (err: unknown, res: Response) => {
  if (err instanceof z.ZodError) {
    const validationErrors = err.errors.reduce(
      (ordering: Record<string, unknown>, error) => {
        const path =
          Array.isArray(error.path) && error.path.length > 0
            ? error.path.join('.')
            : 'unknown';
        ordering[path] = {
          message: error.message,
          name: 'ValidatorError',
          properties: {
            message: error.message,
            type: error.code,
          },
          kind: error.code,
          path: path,
        };
        return ordering;
      },
      {},
    );

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: {
        name: 'ValidationError',
        errors: validationErrors,
      },
      stack: new Error().stack,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const OrderControllers = {
  createOrder,
};
