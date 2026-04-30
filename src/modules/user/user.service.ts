import prisma from '../../utils/prisma';
import { OnboardingDto } from './user.dto';

class UserService {
  public async completeOnboarding(userId: string, data: OnboardingDto) {
    const workspaceName = data.intent === 'WORK' ? 'Team Workspace' : 'Personal Hub';

    const [updatedUser, newWorkspace] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          intent: data.intent,
          teamSize: data.teamSize,
          role: data.role || null,
          hasCompletedOnboarding: true,
        },
      }),
      prisma.workspace.create({
        data: {
          name: workspaceName,
          description: 'Your default workspace',
          ownerId: userId,
        },
      }),
    ]);

    return { user: updatedUser, workspace: newWorkspace };
  }

  public async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, avatarUrl: true, intent: true, teamSize: true, role: true, hasCompletedOnboarding: true, settings: true, createdAt: true, updatedAt: true },
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  public async updateProfile(userId: string, data: any) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, email: true, name: true, avatarUrl: true, intent: true, teamSize: true, role: true, hasCompletedOnboarding: true, settings: true, createdAt: true, updatedAt: true },
    });
    return updatedUser;
  }
}

export default UserService;
