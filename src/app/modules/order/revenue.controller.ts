import { Request, Response } from 'express';
import { Order } from '../order.model';

const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue: revenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate revenue',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const RevenueControllers = {
  calculateTotalRevenue,
};
