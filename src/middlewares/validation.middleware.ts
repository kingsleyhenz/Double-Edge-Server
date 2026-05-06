import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T>(type: any): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) req.body = {};
    const dtoObj = plainToInstance(type, req.body);
    
    if (!dtoObj) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    validate(dtoObj).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints || {})).join(', ');
        res.status(400).json({ message });
      } else {
        req.body = dtoObj;
        next();
      }
    }).catch(err => {
      console.error('Validation error:', err);
      res.status(400).json({ message: 'Validation failed due to bad input' });
    });
  };
}
