import UserController from '@/controllers/user.controller';
import { asyncHandler, validate } from '@/middlewares';
import { createUserSchema, getUserByIdSchema } from '@/schemas/user.schema';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  validate(createUserSchema),
  asyncHandler(UserController.newUser),
);
router.get('/', asyncHandler(UserController.listAll));
router.get(
  '/:id',
  validate(getUserByIdSchema),
  asyncHandler(UserController.getOneById),
);

export default router;
