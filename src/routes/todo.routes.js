import { Router } from 'express';
import TodoController from '../controllers/TodoController.js';
import validate from '../middlewares/validate.js';
import { createTodoSchema } from '../validators/todo.validator.js';
import rateLimiter from '../middlewares/rateLimiter.js';

const router = Router();
const todoController = new TodoController();

// 1 min max 5req
router.get('/', rateLimiter({ windowMs: 1 * 60 * 1000, max: 5 }), todoController.getAll);

router.post('/', validate(createTodoSchema), todoController.create);
router.delete('/:id', todoController.delete);

export default router;




