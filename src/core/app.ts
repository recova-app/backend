import express from 'express';
import { setupViewEngine } from './viewEngine.js';
import welcomeRoutes from '../api/welcome/welcome.routes.js';
import apiRoutes from '../routes/index.js';
import { notFoundHandler } from '../middleware/notFoundHandler.js';
import { errorHandler } from '../middleware/errorHandler.js';

const app = express();

setupViewEngine(app);

app.use(express.json());
app.use('/', welcomeRoutes);
app.use('/api/v1', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
