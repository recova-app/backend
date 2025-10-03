import express, { type Application, type Request, type Response } from 'express';
import { errorHandler } from '../middleware/errorHandler.js';
import apiRoutes from '../routes/index.js';

const app: Application = express();

app.use(express.json());
app.use(errorHandler);
app.use('/api/v1', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Recova API!' });
});

export default app;
