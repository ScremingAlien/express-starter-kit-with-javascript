import TodoService from './todo.service.js';
import { statusCode } from '../../utils/constants/statusCode.js';

export default class TodoController {

  constructor() {
    this.todoService = TodoService;
  }

 

  getAll = async (req, res, next) => {
    try {
      const todos = await this.todoService.getAll();

      // res.fail('Todos not found');
      res.success(todos, statusCode.OK);

    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const { title } = req.body;
      const newTodo = await this.todoService.create(title);
      res.success(newTodo);

    } catch (err) {
      next(err);
    }
  };


  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.todoService.delete(id);
      res.success({ message: 'Todo deleted successfully' });

    } catch (err) {
      next(err);
    }
  };
}
