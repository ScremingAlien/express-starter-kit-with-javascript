import express from 'express';
import cors from 'cors';

import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { responseFormatter } from './middlewares/responseFormater.js';
import connectDB from './config/db.js';

// import your routes here from src/modules
import todoRoutes from './modules/todo/todo.routes.js';


const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

connectDB();

app.use(responseFormatter);


// inject your routes here
app.use('/v1/api/todo', todoRoutes);
 
     
app.use(notFound);
app.use(errorHandler);


export default app;
