import mongoose from "mongoose"
import { Bike } from "../bike.model"
import { TBike } from "./bike.interface"



const createBikeIntoDB = async (bikeData: TBike) => {
  //built it static method
  if (await Bike.isBikeExists(bikeData.name)) {
    throw new Error('Bike already exists!!')
  }
  const result = await Bike.create(bikeData)

  return result

}



const getAllBikesFromDB = async (searchTerm?: string) => {
  const filter: any = {};

  if (searchTerm) {
    filter.$or = [
      { name: { $regex: searchTerm, $options: "i" } }, 
      { brand: { $regex: searchTerm, $options: "i" } }, 
      { category: { $regex: searchTerm, $options: "i" } }, 
    ];
  }

  const result = await Bike.find(filter);
  // console.log(result);
  return result;
};

const getSingleBikeFromDB = async (productId: string) => {
  const result = await Bike.aggregate([{ $match: {_id: new mongoose.Types.ObjectId(productId)}}]);
  // console.log(result);
  return result
}

const deleteBikeFromDB = async (productId: string) => {
  // console.log('Searching for ID:', id);
  const result = await Bike.updateOne({ productId }, { isDeleted: true })
  return result
}


export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  deleteBikeFromDB,
  
}