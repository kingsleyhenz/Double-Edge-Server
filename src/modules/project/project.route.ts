import { Router } from 'express';
import ProjectController from './project.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateProjectDto } from './project.dto';

const router = Router();
const projectController = new ProjectController();

router.post('/', authMiddleware, validationMiddleware(CreateProjectDto), projectController.createProject);
router.get('/workspace/:workspaceId', authMiddleware, projectController.getWorkspaceProjects);

export default router;
