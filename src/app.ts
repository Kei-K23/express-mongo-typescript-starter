import express from 'express';
import morgan from 'morgan';
import logger from '@/config/logger.config';
import { errorHandler } from '@/middlewares/errorHandler.middleware';
import { ApiError } from './utils/ApiError';

const app = express();

// Logger middleware for HTTP request
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.get('/', (req, res) => {
  throw new ApiError('this is error', 400);
});

// Global Error Middleware
app.use(errorHandler);

export { app };
