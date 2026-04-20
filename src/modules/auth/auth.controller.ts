import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from './auth.service';
import { HttpResponse } from '../../utils/response.util';

class AuthController {
  private authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { user, token } = await this.authService.register(userData);
      return HttpResponse.success(res, StatusCodes.CREATED, 'User registered successfully', { user, token });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);
      return HttpResponse.success(res, StatusCodes.OK, 'Login successful', { user, token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
