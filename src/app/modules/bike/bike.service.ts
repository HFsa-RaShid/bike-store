import mongoose from 'mongoose';
import { Bike } from '../bike.model';
import { TBike } from './bike.interface';

const createBikeIntoDB = async (bikeData: TBike) => {
  const result = await Bike.create(bikeData);

  return result;
};

const getAllBikesFromDB = async (searchTerm?: string) => {
  const filter: Record<string, unknown> = {};

  if (searchTerm) {
    filter.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const result = await Bike.find(filter);
  return result;
};

const getSingleBikeFromDB = async (productId: string) => {
  const result = await Bike.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(productId) } },
  ]);
  return result;
};

const updateBikeFromDB = async (productId: string) => {
  const result = await Bike.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(productId) },
    {
      price: 1300,
      quantity: 30,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteBikeFromDB = async (productId: string) => {
  const result = await Bike.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(productId) },
    { isDeleted: true },
  );
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateBikeFromDB,
  deleteBikeFromDB,
};
