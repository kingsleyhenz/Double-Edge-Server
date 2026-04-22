import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { StatusCodes } from 'http-status-codes';
import { HttpResponse } from '../utils/response.util';
import { UserRole } from '../database/enums';

export interface DecodedToken {
  userId: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return HttpResponse.error(res, StatusCodes.UNAUTHORIZED, 'No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    return HttpResponse.error(res, StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
  }
};
