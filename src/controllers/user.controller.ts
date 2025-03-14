import logger from '@/config/logger.config';
import { User } from '@/models/user.model';
import { NextFunction, Request, Response } from 'express';

export default class UserController {
  static newUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Build user document
      const user = User.build(req.body);
      // Save to database
      await user.save();

      res.status(201).type('json').json(user);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = User.find();

      res.status(201).type('json').json(users);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
