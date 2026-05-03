import { Router } from 'express';
import GoalController from './goal.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateGoalDto } from './goal.dto';

const router = Router();
const goalController = new GoalController();

router.post('/', authMiddleware, validationMiddleware(CreateGoalDto), goalController.createGoal);

export default router;
