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

const getAllBikesFromDB = async () => {
  const result = await Bike.find()
  return result
}

const getSingleBikeFromDB = async (name: string) => {
  // console.log('Searching for name:', name);
  // const result = await Student.findOne({ name });
  const result = await Bike.aggregate([{ $match: {name: name}}]);
  return result
}

const deleteBikeFromDB = async (name: string) => {
  // console.log('Searching for ID:', id);
  const result = await Bike.updateOne({ name }, { isDeleted: true })
  return result
}


export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  deleteBikeFromDB,
  
}