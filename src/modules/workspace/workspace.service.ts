import prisma from '../../utils/prisma';
import { CreateWorkspaceDto, InviteWorkspaceDto } from './workspace.dto';
import { WorkspaceRole } from '../../database/enums';
import crypto from 'crypto';
import { SentUtil } from '../../utils/sent.util';
import { generateInviteEmailHtml } from '../../templates/invite.template';

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

  public async inviteToWorkspace(workspaceId: string, inviterId: string, data: InviteWorkspaceDto) {
    const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
    if (!workspace) throw new Error('Workspace not found');

    const inviter = await prisma.user.findUnique({ where: { id: inviterId } });
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    
    if (existingUser) {
      await prisma.workspaceMember.upsert({
        where: { workspaceId_userId: { workspaceId, userId: existingUser.id } },
        update: {},
        create: { workspaceId, userId: existingUser.id, role: WorkspaceRole.MEMBER }
      });
      await SentUtil.sendMessage(data.email, `You've been added to workspace: ${workspace.name}`);
      return { message: 'User added directly since they already have an account' };
    } else {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await prisma.workspaceInvite.upsert({
        where: { workspaceId_email: { workspaceId, email: data.email } },
        update: { token, expiresAt, inviterId },
        create: { email: data.email, token, workspaceId, inviterId, expiresAt }
      });

      const inviteUrl = `http://localhost:3000/register?inviteToken=${token}`;
      const emailHtml = generateInviteEmailHtml(inviter?.name || 'A colleague', workspace.name, inviteUrl);
      
      await SentUtil.sendMessage(data.email, `You've been invited to join ${workspace.name} on Double Edge: ${inviteUrl}`);

      return { message: 'Invite sent to user' };
    }
  }
}
