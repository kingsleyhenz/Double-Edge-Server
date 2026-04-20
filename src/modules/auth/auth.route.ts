import { Router } from 'express';
import AuthController from './auth.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { RegisterDto, LoginDto } from './auth.dto';

const router = Router();
const authController = new AuthController();

router.post('/register', validationMiddleware(RegisterDto), authController.register);
router.post('/login', validationMiddleware(LoginDto), authController.login);

export default router;
