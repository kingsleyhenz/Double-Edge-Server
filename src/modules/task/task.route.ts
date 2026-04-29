import { Router } from 'express';
import TaskController from './task.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateTaskDto, UpdateTaskStatusDto, AssignTaskDto } from './task.dto';

const router = Router();
const taskController = new TaskController();

router.post('/', authMiddleware, validationMiddleware(CreateTaskDto), taskController.createTask);
router.get('/workspace/:workspaceId', authMiddleware, taskController.getWorkspaceTasks);
router.patch('/:id/status', authMiddleware, validationMiddleware(UpdateTaskStatusDto), taskController.updateTaskStatus);
router.patch('/:id/assign', authMiddleware, validationMiddleware(AssignTaskDto), taskController.assignTask);

export default router;
