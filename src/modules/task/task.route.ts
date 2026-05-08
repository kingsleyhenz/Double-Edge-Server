import { Router } from 'express';
import TaskController from './task.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateTaskDto, UpdateTaskStatusDto, AssignTaskDto, UpdateTaskDto } from './task.dto';

const router = Router();
const taskController = new TaskController();

router.post('/', authMiddleware, validationMiddleware(CreateTaskDto), taskController.createTask);
router.get('/workspace/:workspaceId', authMiddleware, taskController.getWorkspaceTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.patch('/:id/status', authMiddleware, validationMiddleware(UpdateTaskStatusDto), taskController.updateTaskStatus);
router.patch('/:id/assign', authMiddleware, validationMiddleware(AssignTaskDto), taskController.assignTask);
router.patch('/:id', authMiddleware, validationMiddleware(UpdateTaskDto), taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;
