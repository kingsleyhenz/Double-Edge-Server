import prisma from '../../utils/prisma';
import { CreateProjectDto } from './project.dto';

export default class ProjectService {
  public async createProject(data: CreateProjectDto) {
    const workspace = await prisma.workspace.findUnique({ where: { id: data.workspaceId } });
    if (!workspace) throw new Error('Workspace not found');

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        color: data.color,
        workspaceId: data.workspaceId,
      }
    });
    return project;
  }

  public async getWorkspaceProjects(workspaceId: string) {
    const projects = await prisma.project.findMany({
      where: { workspaceId },
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    });
    return projects;
  }
}
