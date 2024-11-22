import { Request, Response } from 'express'

const createBike = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // data validation using zod
    const zodParseData = .parse(studentData)
    const result = await StudentServices.createStudentIntoDB(zodParseData);

      // Success Response
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
    } catch (err: any) {
      console.error("Error during student creation:", err.message); 
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
}



export const BikeControllers = {
  createBike,
 
}