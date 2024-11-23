// order.model.ts
import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order/order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = model<TOrder>('Order', OrderSchema);
