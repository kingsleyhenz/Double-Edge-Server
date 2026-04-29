import { Router } from 'express';
import TaskController from './task.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateTaskDto } from './task.dto';

const router = Router();
const taskController = new TaskController();

router.post('/', authMiddleware, validationMiddleware(CreateTaskDto), taskController.createTask);
router.get('/workspace/:workspaceId', authMiddleware, taskController.getWorkspaceTasks);

export default router;
