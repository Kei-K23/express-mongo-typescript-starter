import logger from '@/config/logger.config';
import { NotFoundError } from '@/exceptions';
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

  static listAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find();
      res.status(200).type('json').json(users);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static getOneById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        throw new NotFoundError(`User with ID ${req.params.id} not found`);
      }

      res.status(200).type('json').json(user);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const update = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, update, {
        new: true, // Return updated data
        runValidators: true,
        context: 'query',
      });

      if (!user) {
        throw new NotFoundError(`User with ID ${req.params.id} not found`);
      }

      res.status(200).type('json').json(user);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id, {
        new: true,
      });

      if (!user) {
        throw new NotFoundError(`User with ID ${req.params.id} not found`);
      }

      res.status(204).type('json').send();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
