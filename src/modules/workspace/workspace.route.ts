import { Router } from 'express';
import WorkspaceController from './workspace.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateWorkspaceDto, InviteWorkspaceDto } from './workspace.dto';

const router = Router();
const workspaceController = new WorkspaceController();

router.post('/', authMiddleware, validationMiddleware(CreateWorkspaceDto), workspaceController.createWorkspace);
router.get('/', authMiddleware, workspaceController.getWorkspaces);
router.post('/:id/invite', authMiddleware, validationMiddleware(InviteWorkspaceDto), workspaceController.inviteToWorkspace);

export default router;
