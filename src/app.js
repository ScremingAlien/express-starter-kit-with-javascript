import express from 'express';
import cors from 'cors';

import notFound from './middlewares/default/notFound.js';
import errorHandler from './middlewares/default/errorHandler.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { responseFormatter } from './middlewares/default/responseFormater.js';
import connectDB from './config/db.js';

// import your routes here from src/modules
import todoRoutes from './modules/todo/todo.routes.js';
import compression from 'compression';
 
const app = express();

// default middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(compression());



connectDB();

app.use(responseFormatter);


// inject your routes here
app.use('/v1/api/todo', todoRoutes);
 
 
     
app.use(notFound);
app.use(errorHandler);


export default app;
