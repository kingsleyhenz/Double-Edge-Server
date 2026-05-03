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

  public getUserGoals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const result = await this.goalService.getUserGoals(userId);
      return HttpResponse.success(res, StatusCodes.OK, 'Goals retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;
      const result = await this.goalService.updateGoal(id, userId, req.body);
      return HttpResponse.success(res, StatusCodes.OK, 'Goal updated successfully', result);
    } catch (error: any) {
      if (error.message === 'Goal not found or unauthorized') {
        return HttpResponse.error(res, StatusCodes.NOT_FOUND, error.message);
      }
      next(error);
    }
  };

  public deleteGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;
      await this.goalService.deleteGoal(id, userId);
      return HttpResponse.success(res, StatusCodes.OK, 'Goal deleted successfully', null);
    } catch (error: any) {
      if (error.message === 'Goal not found or unauthorized') {
        return HttpResponse.error(res, StatusCodes.NOT_FOUND, error.message);
      }
      next(error);
    }
  };
}

export default GoalController;
