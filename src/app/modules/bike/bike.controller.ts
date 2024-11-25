import { Request, Response } from 'express';
import bikeSchema from './bike.zod.validation';
import { BikeServices } from './bike.service';
import { z } from 'zod';

const createBike = async (req: Request, res: Response) => {
  try {
    const { bike: bikeData } = req.body;

    // data validation using zod
    const zodParseData = bikeSchema.parse(bikeData);
    const result = await BikeServices.createBikeIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Bike is created successfully',
      data: result,
    });
  } catch (err) {
    handleError(err, res);
  }
};

// get all bikes
const getAllBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await BikeServices.getAllBikesFromDB(searchTerm as string);

    if (!result || result.length === 0) {
      throw new Error('No bikes found');
    }

    res.status(200).json({
      success: true,
      message: 'bikes are retrieved successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'No bikes found') {
      res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: 'No bikes were found matching the search criteria',
        stack: err.stack,
      });
    } else {
      handleError(err, res);
    }
  }
};

// get single BIKE
const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BikeServices.getSingleBikeFromDB(productId);

    if (!result || result.length === 0) {
      throw new Error('The requested bike was not found');
    }

    res.status(200).json({
      success: true,
      message: 'Bike is retrieved successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message === 'The requested bike was not found'
    ) {
      res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: 'The requested bike was not found',
        stack: err.stack,
      });
    } else {
      handleError(err, res);
    }
  }
};

const updateBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BikeServices.updateBikeFromDB(productId);

    if (!result) {
      throw new Error('The bike to update was not found');
    }

    res.status(200).json({
      success: true,
      message: 'Bike updated successfully',
      data: result,
    });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message === 'The bike to update was not found'
    ) {
      res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: 'The bike to update was not found',
        stack: err.stack,
      });
    } else {
      handleError(err, res);
    }
  }
};

// // delete BIKE
const deleteBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BikeServices.deleteBikeFromDB(productId);

    if (!result) {
      throw new Error('The bike to delete was not found');
    }

    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message === 'The bike to delete was not found'
    ) {
      res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: 'The bike to delete was not found',
        stack: err.stack,
      });
    } else {
      handleError(err, res);
    }
  }
};

const handleError = (err: unknown, res: Response) => {
  if (err instanceof z.ZodError) {
    const validationErrors = err.errors.reduce(
      (ordering: Record<string, unknown>, error) => {
        const path =
          Array.isArray(error.path) && error.path.length > 0
            ? error.path.join('.')
            : 'unknown';
        ordering[path] = {
          message: error.message,
          name: 'ValidatorError',
          properties: {
            message: error.message,
            type: error.code,
          },
          kind: error.code,
          path: path,
        };
        return ordering;
      },
      {},
    );

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: {
        name: 'ValidationError',
        errors: validationErrors,
      },
      stack: new Error().stack,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  deleteBike,
  updateBike,
};
