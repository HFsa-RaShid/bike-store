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

export const BikeControllers = {
  createBike,
};
