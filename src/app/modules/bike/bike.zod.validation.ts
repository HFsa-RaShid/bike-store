import { z } from 'zod';

const bikeSchema = z.object({
  name: z
    .string({ required_error: 'Bike name is required' })
    .trim()
    .min(1, 'Bike name cannot be empty'),
  brand: z
    .string({ required_error: 'Bike brand is required' })
    .trim()
    .min(1, 'Bike brand cannot be empty'),
  price: z
    .number({ required_error: 'Bike price is required' })
    .min(0, 'Price cannot be negative'),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    required_error: 'Bike category is required',
  }),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(1, 'Description cannot be empty'),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(0, 'Quantity cannot be negative'),
  inStock: z.boolean({ required_error: 'Stock status is required' }),
  isDeleted: z.boolean().default(false),
});

export default bikeSchema;
