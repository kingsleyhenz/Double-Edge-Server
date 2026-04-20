import { Response } from 'express';

export class HttpResponse {
  static success(res: Response, status: number, message: string, data?: any) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, status: number, message: string, errors?: any) {
    return res.status(status).json({
      success: false,
      message,
      errors,
    });
  }
}
