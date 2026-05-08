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
      const result = await this.taskService.getWorkspaceTasks(workspaceId, req.query);
      return HttpResponse.success(res, StatusCodes.OK, 'Tasks retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.taskService.getTaskById(id);
      return HttpResponse.success(res, StatusCodes.OK, 'Task retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await this.taskService.updateTaskStatus(id, status);
      return HttpResponse.success(res, StatusCodes.OK, 'Task status updated successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public assignTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { assigneeId } = req.body;
      const result = await this.taskService.assignTask(id, assigneeId);
      return HttpResponse.success(res, StatusCodes.OK, 'Task assigned successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.taskService.updateTask(id, req.body);
      return HttpResponse.success(res, StatusCodes.OK, 'Task updated successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id);
      return HttpResponse.success(res, StatusCodes.OK, 'Task deleted successfully', null);
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
