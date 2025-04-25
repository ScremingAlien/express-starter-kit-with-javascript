import TodoService from '../services/TodoService.js';

export default class TodoController {
  constructor() {
    this.todoService = new TodoService();
  }

  getAll = (req, res, next) => {
    try {
      const todos = this.todoService.getAll();
      
      // res.fail('Todos not found');
      res.success(todos);
   
    } catch (err) {
      next(err);
    }
  };

  create = (req, res, next) => {
    try {
      const { title } = req.body;
      const newTodo = this.todoService.create(title);
      res.success(newTodo);
  
    } catch (err) {
      next(err);
    }
  };

  delete = (req, res, next) => {
    try {
      const { id } = req.params;
      this.todoService.delete(id);
      res.success({ message: 'Todo deleted successfully' });
  
    } catch (err) {
      next(err);
    }
  };
}
