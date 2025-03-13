import express from 'express';
import morgan from 'morgan';
import logger from './config/logger.config';

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
  res.json({ message: 'ERROR' });
});

export { app };
