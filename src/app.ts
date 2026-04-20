import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import authRoutes from './modules/auth/auth.route';
import { HttpResponse } from './utils/response.util';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  return HttpResponse.success(res, StatusCodes.OK, 'Server is running', { status: 'ok' });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return HttpResponse.error(res, StatusCodes.INTERNAL_SERVER_ERROR, err.message || 'Internal Server Error');
});

export default app;
