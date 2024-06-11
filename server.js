import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import createServer from './createServer.js';

const PORT = process.env.PORT || 8080;

const app = createServer();

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  })
);
