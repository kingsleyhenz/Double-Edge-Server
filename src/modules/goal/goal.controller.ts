import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import GoalService from './goal.service';
import { HttpResponse } from '../../utils/response.util';

class GoalController {
  private goalService = new GoalService();

  public createGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const result = await this.goalService.createGoal(userId, req.body);
      return HttpResponse.success(res, StatusCodes.CREATED, 'Goal created successfully', result);
    } catch (error) {
      next(error);
    }
  };
}

export default GoalController;
