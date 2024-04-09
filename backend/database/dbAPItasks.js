class dbAPItasks {
  static idCounter = 1;

  //----------------------- Load tasks from local storage---------------------
  loadTasks(userName = "") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks.filter((task) => task.userName === userName)
  }

  // ----------------------- Save tasks to local storage----------------------- 
  saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // ----------------------- GET - for one task---------------------------------
  getTask(taskId) {
    const tasks = this.loadTasks();
    const task = tasks.find((task) => task.id === taskId);
    return task ? task : "Task not found";
  }

  // ----------------------- GET - for a list of tasks--------------------------
  getTasksList(userName) {
    return this.loadTasks(userName);
  }

  //-----------------------  POST - create a new task---------------------------
  addTask(title, description, userName) {
    console.log("Adding task");
    const tasks = this.loadTasks();
    const newTask = {
      id: dbAPItasks.idCounter++,
      title,
      date: new Date().toISOString(),
      description,
      status: false,
      userName
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  // ----------------------- PUT - update an existing task------------------------
  updateTask(taskId, updatedTaskData) {
    const tasks = this.loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updatedTaskData,
      };
      this.saveTasks(tasks);
      return tasks[taskIndex];
    } else {
      return "Task not found";
    }
  }

  //-----------------------  DELETE - delete a task------------------------------
  deleteTask(taskId) {
    console.log("Deleting task");
    const tasks = this.loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const deletedTask = tasks.splice(taskIndex, 1)[0];
      this.saveTasks(tasks);
      return `Task with ID ${deletedTask.id} has been deleted`;
    } else {
      return "Task not found";
    }
  }
}
