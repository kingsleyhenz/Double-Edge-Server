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
}

export default UserService;
