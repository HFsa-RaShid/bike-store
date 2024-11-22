import { Schema, model } from 'mongoose';
import { BikeModel, TBike } from './bike/bike.interface';


const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, 'Bike name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Bike brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Bike price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Bike category is required'],
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'], 
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required'],
    },
  },
  { timestamps: true } 
);

// Pre-save middleware
bikeSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.inStock = false;
  }
  next();
});

// Post-save middleware
bikeSchema.post('save', function (doc, next) {
  next();
});




// baki ache//////////////////////////delete ar pre post





// Static method to check if a bike exists
bikeSchema.statics.isBikeExists = async function (name: string) {
  return await this.findOne({ name });
};


export const Bike = model<TBike, BikeModel >('Bike', bikeSchema)
