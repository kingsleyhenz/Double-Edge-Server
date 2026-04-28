import prisma from '../../utils/prisma';
import { CreateWorkspaceDto } from './workspace.dto';
import { WorkspaceRole } from '../../database/enums';

export default class WorkspaceService {
  public async createWorkspace(userId: string, data: CreateWorkspaceDto) {
    const workspace = await prisma.workspace.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
        members: {
          create: {
            userId: userId,
            role: WorkspaceRole.ADMIN,
          }
        }
      },
      include: {
        members: true
      }
    });
    return workspace;
  }

  public async getWorkspaces(userId: string) {
    const workspaces = await prisma.workspace.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } }
        ]
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      }
    });
    return workspaces;
  }
}
