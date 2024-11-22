import { Schema, model } from 'mongoose';

export type TBike = {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const BikeSchema = new Schema<TBike>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
//   time add automatically
  { timestamps: true },
);

// for creating static
// export interface StudentModel extends Model<TBike> {
//   isUserExists(id: string): Promise<TBike | null>
// }
export const BikeModel = model<TBike>('Bike', BikeSchema);