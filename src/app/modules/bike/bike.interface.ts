import { Model } from 'mongoose';

export type TBike = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain'| 'Road'| 'Hybrid'| 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};


// for creating static
export interface BikeModel extends Model<TBike> {
  isUserExists(name: string): Promise<TBike | null>
}
