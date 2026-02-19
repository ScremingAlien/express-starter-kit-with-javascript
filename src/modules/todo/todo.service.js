import eventBus from "../../utils/eventBus.js";
import { TodoRepository } from "./todo.repository.js";

class TodoService {
  constructor() {
    this.todoRepository = new TodoRepository(); // inject model
  }

  async getAll() {
    const todos = await this.todoRepository.findAll();
    return todos;
  }

  async create() {
    const newtodo = { id: Date.now(), title: "demo" };
    eventBus.emit("todo.created", newtodo);
    return newtodo;
  }
}

export default new TodoService();
