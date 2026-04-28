import { Router } from 'express';
import WorkspaceController from './workspace.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateWorkspaceDto } from './workspace.dto';

const router = Router();
const workspaceController = new WorkspaceController();

router.post('/', authMiddleware, validationMiddleware(CreateWorkspaceDto), workspaceController.createWorkspace);

export default router;
