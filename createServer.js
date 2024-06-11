import express from 'express';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api/users', userRouter);
  app.get('/', (req, res) => {
    res.send('Hello');
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createServer;
