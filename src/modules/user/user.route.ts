import { Router } from 'express';
import UserController from './user.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { OnboardingDto } from './user.dto';

const router = Router();
const userController = new UserController();

router.post('/onboarding', authMiddleware, validationMiddleware(OnboardingDto), userController.completeOnboarding);

export default router;
