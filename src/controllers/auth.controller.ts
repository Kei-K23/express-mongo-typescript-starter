import { envConfig } from '@/config/env.config';
import logger from '@/config/logger.config';
import { UnauthorizedError } from '@/exceptions';
import { User } from '@/models/user.model';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user || !(await user.verifyPassword(password))) {
        throw new UnauthorizedError(`Invalid login credentials`);
      }

      const jwtSignOptions: jwt.SignOptions = {
        expiresIn: envConfig.jwt.expiresIn,
        algorithm: 'HS256',
      };

      // Sign JWT, and generate token
      const token = jwt.sign(
        {
          userId: user.id,
          userRole: user.role,
        },
        envConfig.jwt.secretKey,
        jwtSignOptions,
      );

      res.status(200).type('json').json({
        token,
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  static register = async (req: Request, res: Response, next: NextFunction) => {
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
}
