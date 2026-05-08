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
    if (filters.priority) whereClause.priority = filters.priority;
    
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

  public async getTaskById(taskId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignee: { select: { id: true, name: true, email: true, avatarUrl: true } },
        project: { select: { id: true, name: true, color: true } },
        notes: {
          include: {
            author: { select: { id: true, name: true, email: true, avatarUrl: true } }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });
    if (!task) throw new Error('Task not found');
    return task;
  }

  public async updateTaskStatus(taskId: string, status: any) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status }
    });
    return task;
  }

  public async assignTask(taskId: string, assigneeId: string) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { assigneeId }
    });
    return task;
  }

  public async updateTask(taskId: string, data: any) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.priority && { priority: data.priority }),
        ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
      }
    });
    return task;
  }

  public async deleteTask(taskId: string) {
    await prisma.task.delete({
      where: { id: taskId }
    });
    return true;
  }
}
