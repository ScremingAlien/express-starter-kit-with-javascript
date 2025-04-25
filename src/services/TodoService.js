export default class TodoService {
     constructor() {
       this.todos = [];
       this.counter = 1;
     }
   
     getAll() {
       return this.todos;
     }
   
     create(title) {
       const todo = { id: this.counter++, title };
       this.todos.push(todo);
       return todo;
     }
   
     delete(id) {
       const index = this.todos.findIndex(t => t.id === parseInt(id));
       if (index === -1) throw new Error('Todo not found');
       this.todos.splice(index, 1);
     }
   }
   