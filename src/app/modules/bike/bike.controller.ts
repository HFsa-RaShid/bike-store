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
  } catch (err: any) {
    if (err.message === 'No bikes found') {
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
  } catch (err: any) {
    if (err.message === 'The requested bike was not found') {
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
  } catch (err: any) {
    if (err.message === 'The bike to update was not found') {
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
      success: true,
      message: 'Bike deleted successfully',
      data: {},
    });
  } catch (err: any) {
    if (err.message === 'The bike to delete was not found') {
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

//  error handler function
const handleError = (err: any, res: Response) => {
  const errorResponse = {
    success: false,
    message: 'Something went wrong',
    error: err.message || 'An error occurred',
    stack: err.stack,
  };

  if (err instanceof z.ZodError) {
    const validationErrors = err.errors.reduce((acc: any, error: any) => {
      acc[error.path[0]] = {
        message: error.message,
        name: 'ValidatorError',
        properties: {
          message: error.message,
          type: error.code,
        },
        kind: error.code,
        path: error.path[0],
      };
      return acc;
    }, {});

    errorResponse.message = 'Validation failed';
    errorResponse.error = validationErrors;
  } else if (err instanceof Error) {
    errorResponse.message = err.message || 'An unexpected error occurred';
    errorResponse.error = err;
  }

  res.status(err.status || 500).json(errorResponse);
};

export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  deleteBike,
  updateBike,
};

// import { Request, Response } from 'express';
// import bikeSchema from './bike.zod.validation';
// import { BikeServices } from './bike.service';
// import { z } from 'zod';

// type ErrorResponse = {
//   success: boolean;
//   message: string;
//   error: string | Record<string, unknown>;
//   stack?: string;
// };

// // Create a new bike
// const createBike = async (req: Request, res: Response) => {
//   try {
//     const { bike: bikeData } = req.body;

//     // Data validation using zod
//     const zodParseData = bikeSchema.parse(bikeData);
//     const result = await BikeServices.createBikeIntoDB(zodParseData);

//     res.status(200).json({
//       success: true,
//       message: 'Bike is created successfully',
//       data: result,
//     });
//   } catch (err) {
//     handleError(err, res);
//   }
// };

// // Get all bikes
// const getAllBikes = async (req: Request, res: Response) => {
//   try {
//     const { searchTerm } = req.query;
//     const result = await BikeServices.getAllBikesFromDB(searchTerm as string);

//     if (!result || result.length === 0) {
//       throw new Error('No bikes found');
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Bikes are retrieved successfully',
//       data: result,
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error && err.message === 'No bikes found') {
//       res.status(404).json({
//         success: false,
//         message: 'Resource not found',
//         error: 'No bikes were found matching the search criteria',
//         stack: err.stack,
//       });
//     } else {
//       handleError(err, res);
//     }
//   }
// };

// // Get single bike
// const getSingleBike = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const result = await BikeServices.getSingleBikeFromDB(productId);

//     if (!result || result.length === 0) {
//       throw new Error('The requested bike was not found');
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Bike is retrieved successfully',
//       data: result,
//     });
//   } catch (err: unknown) {
//     if (
//       err instanceof Error &&
//       err.message === 'The requested bike was not found'
//     ) {
//       res.status(404).json({
//         success: false,
//         message: 'Resource not found',
//         error: 'The requested bike was not found',
//         stack: err.stack,
//       });
//     } else {
//       handleError(err, res);
//     }
//   }
// };

// // Update bike
// const updateBike = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const result = await BikeServices.updateBikeFromDB(productId);

//     if (!result) {
//       throw new Error('The bike to update was not found');
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Bike updated successfully',
//       data: result,
//     });
//   } catch (err: unknown) {
//     if (
//       err instanceof Error &&
//       err.message === 'The bike to update was not found'
//     ) {
//       res.status(404).json({
//         success: false,
//         message: 'Resource not found',
//         error: 'The bike to update was not found',
//         stack: err.stack,
//       });
//     } else {
//       handleError(err, res);
//     }
//   }
// };

// // Delete bike
// const deleteBike = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const result = await BikeServices.deleteBikeFromDB(productId);

//     if (!result) {
//       throw new Error('The bike to delete was not found');
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Bike deleted successfully',
//       data: {},
//     });
//   } catch (err: unknown) {
//     if (
//       err instanceof Error &&
//       err.message === 'The bike to delete was not found'
//     ) {
//       res.status(404).json({
//         success: false,
//         message: 'Resource not found',
//         error: 'The bike to delete was not found',
//         stack: err.stack,
//       });
//     } else {
//       handleError(err, res);
//     }
//   }
// };

// // Error handler function
// const handleError = (err: unknown, res: Response) => {
//   const errorResponse: ErrorResponse = {
//     success: false,
//     message: 'Something went wrong',
//     error: 'An error occurred',
//   };

//   if (err instanceof z.ZodError) {
//     const validationErrors = err.errors.reduce(
//       (acc: Record<string, unknown>, error) => {
//         acc[error.path[0]] = {
//           message: error.message,
//           name: 'ValidatorError',
//           properties: {
//             message: error.message,
//             type: error.code,
//           },
//           kind: error.code,
//           path: error.path[0],
//         };
//         return acc;
//       },
//       {},
//     );

//     errorResponse.message = 'Validation failed';
//     errorResponse.error = validationErrors;
//   }
//   res.status(500).json(errorResponse);
// };

// export const BikeControllers = {
//   createBike,
//   getAllBikes,
//   getSingleBike,
//   deleteBike,
//   updateBike,
// };
