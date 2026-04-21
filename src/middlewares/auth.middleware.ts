import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../utils/response.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, StatusCodes.UNAUTHORIZED, 'No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    // The decoded token will be attached to the request in the next step
    next();
  } catch (error) {
    return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
  }
};
