import mongoose, { Model } from 'mongoose';

export type TOrder = {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// for creating static
export interface OrderModel extends Model<TOrder> {}
