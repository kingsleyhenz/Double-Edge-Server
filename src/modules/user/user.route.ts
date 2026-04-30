import { Router } from 'express';
import UserController from './user.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { OnboardingDto, UpdateProfileDto } from './user.dto';

const router = Router();
const userController = new UserController();

router.post('/onboarding', authMiddleware, validationMiddleware(OnboardingDto), userController.completeOnboarding);
router.get('/profile', authMiddleware, userController.getProfile);
router.patch('/profile', authMiddleware, validationMiddleware(UpdateProfileDto), userController.updateProfile);

export default router;
