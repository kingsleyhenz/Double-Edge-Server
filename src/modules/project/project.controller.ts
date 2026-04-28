import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProjectService from './project.service';
import { HttpResponse } from '../../utils/response.util';

class ProjectController {
  private projectService = new ProjectService();

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.projectService.createProject(req.body);
      return HttpResponse.success(res, StatusCodes.CREATED, 'Project created successfully', result);
    } catch (error: any) {
      if (error.message === 'Workspace not found') {
        return HttpResponse.error(res, StatusCodes.NOT_FOUND, error.message);
      }
      next(error);
    }
  };

  public getWorkspaceProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { workspaceId } = req.params;
      const result = await this.projectService.getWorkspaceProjects(workspaceId);
      return HttpResponse.success(res, StatusCodes.OK, 'Projects retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectController;
