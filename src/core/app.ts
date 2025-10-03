import express, { type Application, type Request, type Response } from 'express';
import apiRoutes from '../routes/index.js';
import { errorHandler } from '../middleware/errorHandler.js';

const app: Application = express();

app.use(express.json());
app.use('/api/v1', apiRoutes);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Recova API!' });
});

export default app;
