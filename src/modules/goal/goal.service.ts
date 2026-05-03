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
}
