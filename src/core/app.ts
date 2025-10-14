import express from 'express';
import { setupViewEngine } from './viewEngine.js';
import welcomeRoutes from '../api/welcome/welcome.routes.js';
import apiRoutes from '../routes/index.js';
import { notFoundHandler } from '../handler/notFound.handler.js';
import { errorHandler } from '../handler/error.handler.js';
import { globalApiLimiter } from '../middleware/rateLimiter.middleware.js';

const app = express();

setupViewEngine(app);

app.use(express.json());
app.use('/', welcomeRoutes);
app.use('/api/v1', globalApiLimiter, apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
