import eventBus from "../../utils/eventBus.js";

class TodoService {
  /*
  constructor() {
    this.TODO = todoModel;
  }
  */

  async getAll() {
    return [];
  }

  async create(data) {
    const newtodo = { id: Date.now(), ...data };

    // Emit event
    eventBus.emit("todo.created", newtodo);

    return newtodo;
  }
}

export default new TodoService();
