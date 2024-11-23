import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BikeRoutes } from './app/modules/bike/bike.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications routes
app.use('/api/products', BikeRoutes);
app.use('/api/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
