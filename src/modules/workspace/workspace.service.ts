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
}
