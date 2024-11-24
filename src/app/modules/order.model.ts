import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order/order.interface';
import { Bike } from './bike.model';

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

OrderSchema.pre('save', async function (next) {
  if (!this.totalPrice) {
    const product = await Bike.findById(this.product);
    if (product) {
      this.totalPrice = product.price * this.quantity;
    }
  }
  next();
});

export const Order = model<TOrder>('Order', OrderSchema);
