import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from './user.service';
import { HttpResponse } from '../../utils/response.util';

class UserController {
  private userService = new UserService();

  public completeOnboarding = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return HttpResponse.error(res, StatusCodes.UNAUTHORIZED, 'Unauthorized');
      }

      const data = req.body;
      const result = await this.userService.completeOnboarding(userId, data);
      
      return HttpResponse.success(res, StatusCodes.OK, 'Onboarding completed successfully', result);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
