class server {
  constructor() {
    this.dbTasks = new dbAPItasks();
    this.dbUsers = new dbAPIusers();
  }
//---------------Matching the command type to the appropriate functions-----------------
  requestHandler(data, func = (x) => {}) {
    const parsedData = JSON.parse(data);
    const object = parsedData.object;
    const method = parsedData.data.method;

    if (method === "GET") {
      if (object.tasks) { 
        func(this.dbTasks.getTasksList(object.userName));
      } else if (object === "users") { 
        func(this.dbUsers.getUsersList());
      } else if (object.taskId) { 
        func(this.dbTasks.getTask(object.taskId));
      } else if (object.userName) {
        func(this.dbUsers.getUser(object.userName));
      } else {
        ("Error: Invalid object");
      }
    } else if (method === "POST") {
      if (object.title && object.description) { 
        func(this.dbTasks.addTask(
          object.title,
          object.description,
          object.userName
        ));
      } else if (object.userName && object.password) {
        func(this.dbUsers.addUser(object.userName, object.password));
      } else {
        func("Error: Invalid object");
      }
    } else if (method === "PUT") {
      if (object.taskId) {
        this.dbTasks.updateTask(object.taskId, object);
      } else if (object.userName) {
        func(this.dbUsers.updateUser(object.userName, object));
      } else {
        func("Error: Invalid object");
      }
    } else if (method === "DELETE") {
      if (object.taskId) {
        func(this.dbTasks.deleteTask(object.taskId));
      } else if (object.userName) {
        func(this.dbUsers.deleteUser(object.userName));
      } else {
        func("Error: Invalid object");
      }
    }
  }
}
