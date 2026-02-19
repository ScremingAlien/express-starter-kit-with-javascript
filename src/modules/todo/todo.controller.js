import TodoService from "./todo.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "../../middlewares/default/asyncHandler.js";
import "./todo.event.js";

export default class TodoController {
  constructor() {
    this.todoService = TodoService;
  }

  get = asyncHandler(async (req, res) => {
    const todos = await this.todoService.getAll();

    // res.fail('Todos not found');
    res.success("Get All Todos", todos, statusCode.OK);
  });
}
