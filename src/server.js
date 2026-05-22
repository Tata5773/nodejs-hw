import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(notesRouter);

// eslint-disable-next-line no-unused-vars
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
