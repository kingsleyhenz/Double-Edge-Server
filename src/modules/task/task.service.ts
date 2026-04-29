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
}
