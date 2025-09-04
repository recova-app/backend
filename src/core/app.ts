import express, { type Application, type Request, type Response } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Recova API!' });
});

export default app;
