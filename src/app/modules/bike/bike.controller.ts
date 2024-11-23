import { Request, Response } from 'express';
import bikeSchema from './bike.zod.validation';
import { BikeServices } from './bike.service';

const createBike = async (req: Request, res: Response) => {
  try {
    const { bike: bikeData } = req.body;

    // data validation using zod
    const zodParseData = bikeSchema.parse(bikeData);
    const result = await BikeServices.createBikeIntoDB(zodParseData);

    // Success Response
    res.status(200).json({
      success: true,
      message: 'Bike is created successfully',
      data: result,
    });
  } catch (err: any) {
    console.error('Error during bike creation:', err.message);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// get all bikes
const getAllBikes = async (req: Request, res: Response) => {
    try {
      const { searchTerm } = req.query;
      const result = await BikeServices.getAllBikesFromDB(searchTerm as string)
      res.status(200).json({
        success: true,
        message: 'bikes are retrieved successfully',
        data: result,
      })
    } catch (err: any) {
      console.error("Error during bikes retrieve:", err.message); 
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  }
  
  // get single BIKE
  const getSingleBike = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params
      
      const result = await BikeServices.getSingleBikeFromDB(productId)
      
      res.status(200).json({
        success: true,
        message: 'Bike is retrieved successfully',
        data: result,
      })
    } catch (err: any) {
      console.error("Error during bikes retrieve:", err.message); 
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  }
  
  // // delete BIKE
  const deleteBike = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params
      const result = await BikeServices.deleteBikeFromDB(productId)
   
      res.status(200).json({
        success: true,
        message: 'Bike deleted successfully',
        data: result,
      })
    } catch (err: any) {
      console.error("Error during bike deletion:", err.message); 
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  }

export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  deleteBike,
  
};
