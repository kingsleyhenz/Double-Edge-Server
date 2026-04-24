import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpResponse } from '../utils/response.util';
import { UserRole } from '../database/enums';

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return HttpResponse.error(res, StatusCodes.FORBIDDEN, 'Access denied: No role assigned');
    }

    if (!allowedRoles.includes(userRole as UserRole)) {
      return HttpResponse.error(res, StatusCodes.FORBIDDEN, 'Access denied: Insufficient permissions');
    }

    next();
  };
};
