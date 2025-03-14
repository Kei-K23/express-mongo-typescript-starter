import express from 'express';
import morgan from 'morgan';
import logger from '@/config/logger.config';
import { errorHandler } from '@/middlewares/errorHandler.middleware';

const app = express();

// Logger middleware for HTTP request
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.get('/', (req, res) => {});

// Global error handling middleware
app.use(errorHandler);

export { app };
