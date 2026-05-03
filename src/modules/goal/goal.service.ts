import prisma from '../../utils/prisma';
import { CreateGoalDto, UpdateGoalDto } from './goal.dto';

export default class GoalService {
  public async createGoal(userId: string, data: CreateGoalDto) {
    const goal = await prisma.goal.create({
      data: {
        title: data.title,
        description: data.description,
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
        color: data.color,
        userId: userId,
      }
    });
    return goal;
  }

  public async getUserGoals(userId: string) {
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return goals;
  }

  public async updateGoal(goalId: string, userId: string, data: UpdateGoalDto) {
    const existing = await prisma.goal.findUnique({ where: { id: goalId } });
    if (!existing || existing.userId !== userId) {
      throw new Error('Goal not found or unauthorized');
    }

    const goal = await prisma.goal.update({
      where: { id: goalId },
      data: {
        title: data.title,
        description: data.description,
        targetDate: data.targetDate ? new Date(data.targetDate) : undefined,
        progress: data.progress,
        color: data.color,
      }
    });
    return goal;
  }
}
