import express from 'express';
import cors from 'cors';

import todoRoutes from './routes/todo.routes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { responseFormatter } from './middlewares/responseFormater.js';
import connectDB from './config/db.js';

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

connectDB();

app.use(responseFormatter);
app.use('/v1/api/todos', todoRoutes);
     
app.use(notFound);
app.use(errorHandler);


export default app;
