// revenue.controller.ts
import { Request, Response } from 'express';
import { Order } from '../order.model';

const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await Order.aggregate([
      {
        // Join the Order with the Product collection to get the price of each product
        $lookup: {
          from: 'products', // Assuming the collection name is "products"
          localField: 'product', // Refers to the 'product' field in the order document
          foreignField: '_id', // Refers to the '_id' field in the product document
          as: 'productInfo'
        }
      },
      {
        // Unwind the productInfo array to get the product price
        $unwind: '$productInfo'
      },
      {
        // Multiply the price by the quantity to get the total price for each order
        $project: {
          totalPrice: {
            $multiply: ['$productInfo.price', '$quantity']
          }
        }
      },
      {
        // Sum all the total prices to get the total revenue
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue: revenue,
      },
    });
  } catch (err) {
    handleError(err, res);
  }
};

// Error handler function
const handleError = (err: unknown, res: Response) => {
  const errorResponse = {
    success: false,
    message: 'Something went wrong',
    error: (err instanceof Error && err.message) || 'An error occurred',
    stack: (err instanceof Error && err.stack) || undefined,
  };
  res.status(500).json(errorResponse);
};

export const RevenueControllers = {
  calculateTotalRevenue,
};


