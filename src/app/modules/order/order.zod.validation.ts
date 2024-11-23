import { Types } from 'mongoose';
import { z } from 'zod';

export const OrderSchema = z.object({
  email: z
   .string({ message: 'Email is required.' })
    .email({ message: 'Invalid email format.' }),
  
  product: z.instanceof(Types.ObjectId, { message: 'Product ID must be a valid ObjectId.' })
    .refine((value) => value instanceof Types.ObjectId, {
      message: 'Product ID is required and must be a valid ObjectId.',
    }),

  quantity: z
     .number({ message: 'Quantity is required.' })
    .int({ message: 'Quantity must be an integer.' })
    .positive({ message: 'Quantity must be a positive number.' })
    .nonnegative({ message: 'Quantity is required and must be a positive number.' }),

  totalPrice: z
    .number({ message: 'Total Price is required.' })
    .positive({ message: 'Total price must be a positive number.' })
    .nonnegative({ message: 'Total price is required and must be a positive number.' }),
});

export default OrderSchema;
