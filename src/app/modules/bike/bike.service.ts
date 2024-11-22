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



export const BikeServices = {
  createBikeIntoDB,
  
}