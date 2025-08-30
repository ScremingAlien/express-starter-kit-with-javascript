import TodoService from "./todo.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import "./todo.event.js";

export default class TodoController {
  constructor() {
    this.todoService = TodoService;
  }

  getAll = async (req, res, next) => {
    try {
      // res.fail('Todos not found');
      res.success("Get All Todos", { from: "todo Module" }, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const todo = await this.todoService.create(req.body);
      res.success("todo Created", todo, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };
}
