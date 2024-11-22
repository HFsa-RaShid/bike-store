import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BikeRoutes } from './app/modules/bike/bike.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications routes
app.use('/api/v1/products', BikeRoutes)

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
