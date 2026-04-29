import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TaskService from './task.service';
import { HttpResponse } from '../../utils/response.util';

class TaskController {
  private taskService = new TaskService();

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.taskService.createTask(req.body);
      return HttpResponse.success(res, StatusCodes.CREATED, 'Task created successfully', result);
    } catch (error: any) {
      if (error.message === 'Workspace not found') {
        return HttpResponse.error(res, StatusCodes.NOT_FOUND, error.message);
      }
      next(error);
    }
  };
}

export default TaskController;
