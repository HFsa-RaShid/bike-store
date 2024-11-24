import mongoose from 'mongoose';
import { z } from 'zod';

export const OrderSchema = z.object({
  email: z
    .string({ message: 'Email is required.' })
    .email({ message: 'Invalid email format.' }),

  product: z
    .string({ message: 'Product ID is required.' })
    .refine((value) => mongoose.isValidObjectId(value), {
      message: 'Product ID must be a valid ObjectId.',
    }),

  quantity: z
    .number({ message: 'Quantity is required.' })
    .int({ message: 'Quantity must be an integer.' })
    .positive({ message: 'Quantity must be a positive number.' })
    .nonnegative({
      message: 'Quantity is required and must be a positive number.',
    }),

  totalPrice: z
    .number({ message: 'Total Price is required.' })
    .positive({ message: 'Total price must be a positive number.' })
    .nonnegative({
      message: 'Total price is required and must be a positive number.',
    }),
});

export default OrderSchema;
