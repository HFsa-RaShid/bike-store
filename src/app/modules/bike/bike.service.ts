import { Bike } from "../bike.model"
import { TBike } from "./bike.interface"



const createBikeIntoDB = async (studentData: TBike) => {
  //built it static method
  if (await Bike.isUserExists(studentData.name)) {
    throw new Error('User already exists!!')
  }
  const result = await Bike.create(studentData)

  return result

}



export const BikeServices = {
  createBikeIntoDB,
  
}