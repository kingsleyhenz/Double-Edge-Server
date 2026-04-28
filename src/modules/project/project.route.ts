import { Router } from 'express';
import ProjectController from './project.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

const router = Router();
const projectController = new ProjectController();

router.post('/', authMiddleware, validationMiddleware(CreateProjectDto), projectController.createProject);
router.get('/workspace/:workspaceId', authMiddleware, projectController.getWorkspaceProjects);
router.patch('/:id', authMiddleware, validationMiddleware(UpdateProjectDto), projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

export default router;
