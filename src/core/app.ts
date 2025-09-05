import express, { type Application, type Request, type Response } from 'express';
import authRoutes from '../api/auth/auth.routes.js';
import userRoutes from '../api/users/user.routes.js';
import routineRoutes from '../api/routine/routine.routes.js';

const app: Application = express();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/routine', routineRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Recova API!' });
});

export default app;
