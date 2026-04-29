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

  public getWorkspaceTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { workspaceId } = req.params;
      const filters = {
        projectId: req.query.projectId as string,
        assigneeId: req.query.assigneeId as string,
        status: req.query.status as string,
      };
      const result = await this.taskService.getWorkspaceTasks(workspaceId, filters);
      return HttpResponse.success(res, StatusCodes.OK, 'Tasks retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
