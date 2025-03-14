import UserController from '@/controllers/user.controller';
import { asyncHandler } from '@/middlewares';
import { Router } from 'express';

const router = Router();

router.post('/', asyncHandler(UserController.newUser));

export default router;
