import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import WorkspaceService from './workspace.service';
import { HttpResponse } from '../../utils/response.util';

class WorkspaceController {
  private workspaceService = new WorkspaceService();

  public createWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return HttpResponse.error(res, StatusCodes.UNAUTHORIZED, 'Unauthorized');
      }
      
      const result = await this.workspaceService.createWorkspace(userId, req.body);
      return HttpResponse.success(res, StatusCodes.CREATED, 'Workspace created successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public getWorkspaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      if (!userId) return HttpResponse.error(res, StatusCodes.UNAUTHORIZED, 'Unauthorized');
      
      const result = await this.workspaceService.getWorkspaces(userId);
      return HttpResponse.success(res, StatusCodes.OK, 'Workspaces retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  };
}

export default WorkspaceController;
