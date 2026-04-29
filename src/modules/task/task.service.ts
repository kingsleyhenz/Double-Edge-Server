import prisma from '../../utils/prisma';
import { CreateTaskDto } from './task.dto';

export default class TaskService {
  public async createTask(data: CreateTaskDto) {
    const workspace = await prisma.workspace.findUnique({ where: { id: data.workspaceId } });
    if (!workspace) throw new Error('Workspace not found');

    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        workspaceId: data.workspaceId,
        projectId: data.projectId || null,
        assigneeId: data.assigneeId || null,
      }
    });
    return task;
  }

  public async getWorkspaceTasks(workspaceId: string, filters: any) {
    const whereClause: any = { workspaceId };
    if (filters.projectId) whereClause.projectId = filters.projectId;
    if (filters.assigneeId) whereClause.assigneeId = filters.assigneeId;
    if (filters.status) whereClause.status = filters.status;
    
    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true, color: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return tasks;
  }
}
