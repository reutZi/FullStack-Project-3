// all the functions for the signin page
const signinSubmit = document.getElementById("signinSubmit");
signinSubmit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission
    const request = new FXMLHttpRequest();
    request.open("GET", "");
    request.onload = function(users) {
        submit(event, users);
    };
    request.send("users");
});

function submit(event, users) {
    event.preventDefault(); 
    var user = users.find(user => user.userName === username.value);

    if (user) {
        let failedAttempts = localStorage.getItem('failedAttempts') || 0;
        localStorage.setItem('failedAttempts', failedAttempts);
        if (user.password === password.value){
            handleLogin(user);
            failedAttempts = 0;
            localStorage.setItem('failedAttempts', failedAttempts);
        } else {
            failedAttempts = parseInt(failedAttempts);
            failedAttempts++;
            localStorage.setItem('failedAttempts', failedAttempts);
            
            if (failedAttempts >= 3) {
                alert('You have entered the wrong password 3 times. You are blocked for 30 seconds.');
                
                // Hide the button
                signinSubmit.style.display = 'none';
                
                setTimeout(() => {
                    localStorage.removeItem('failedAttempts');
                    signinSubmit.style.display = 'block'; // Show the button after unblocking
                }, 30000); // Unblock after 30 seconds
            } else {
                alert('Password is not correct, try again.');
            }
        }
        
    } else {
        alert('This username does not exist.');
    }
}

// all the functions for the signup page
const firstNameInput = document.getElementById('firstName'),
lastNameInput = document.getElementById('lastName'),
userNameInput = document.getElementById('userName'),
passwordInput = document.getElementById('password'),
emailInput = document.getElementById('email'),
birthDateInput = document.getElementById('birthDate'),
submitButton = document.getElementById('signupSubmit');

submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const request = new FXMLHttpRequest();
    request.open("POST", "");
    request.onload = function(users) {
        addUser(event, users);
    };
    request.send("users");
});

// function setUserDetails(first, last, name, pass, email){
//     document.getElementById("firstName").value = first;
//     document.getElementById("lastName").value = last;
//     document.getElementById("userName").value = name;
//     document.getElementById("password").value = pass;
//     document.getElementById("email").value = email;
// }

// function createUserObject() {
//     return {
//       firstName: firstNameInput.value,
//       lastName: lastNameInput.value,
//       userName: userNameInput.value,
//       password: passwordInput.value,
//       email: emailInput.value,
//       birthDate: birthDateInput.value
//     };
// }

function addUser(){
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = createUserObject();

    if (checkUserName(user.userName, users) &&
        checkPassword(user.password) &&
        checkEmail(user.email)) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        handleLogin(user);
    }
}

function checkUserName(userName, users){
    if (users && users.some(user => user.userName === userName)) {
        alert('Username already exists. Please choose another one.');
        return false;
    }

    return true;
}

function checkPassword(password){
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        alert('Password can only contain letters and numbers.');
        return false;
    }

    return true;
}

function checkEmail(email){
    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}





// all the functions for the tasks page
const addTaskButton = document.getElementById("addTask");
const popUp = document.getElementById("popUp");
const closePopUp = document.getElementById("close");
const closeEditPopUp = document.getElementById("close2");
const newTaskSubmit = document.getElementById("newTaskSubmit");
const editTaskSubmit = document.getElementById("editTaskSubmit");
var editedTask;

window.addEventListener("load", function() {
    const request = new FXMLHttpRequest();
    request.open("GET", "");
    request.onload = function(tasks) {;
        tasks.forEach((task) => {
        printTask(task);
        });
    };
    request.send("tasks");
});

addTaskButton.addEventListener("click", () => {
  popUp.classList.add("active");
});

closePopUp.addEventListener("click", () => {popUp.classList.remove("active")});
closeEditPopUp.addEventListener("click", () => {editPopUp.classList.remove("active")});

newTaskSubmit.addEventListener("click", addTask);
editTaskSubmit.addEventListener("click", updateTask);

// Add event listener to all checkboxes
const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", taskStatusChanged);
});

function printTask(newTask){
    const taskList = document.getElementById("taskList");
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.dataset.taskId = newTask.id;
      taskElement.innerHTML = `
            <input type="hidden" class="task-id" value="${newTask.id}">
            <input type="checkbox" class="task-checkbox">
            <span class="task-title">${newTask.title}</span>
            <span class="task-description">${newTask.description}</span>
            <i class='bx bx-trash' id="delete" ></i>
            <i class='bx bxs-edit-alt' id="edit"></i>
        `;
      taskList.appendChild(taskElement);
      const checkbox = taskElement.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", taskStatusChanged);
      const deleteButton = taskElement.querySelector("#delete");
      deleteButton.addEventListener("click", deleteTask);
      const editButton = taskElement.querySelector("#edit");
      editButton.addEventListener("click", editTask);
}

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

function taskStatusChanged(event) {
  const checkbox = event.target;
  const taskElement = checkbox.closest(".task");
  const taskId = parseInt(taskElement.dataset.taskId);

  const request = new FXMLHttpRequest();
  request.open("PUT", "");
  request.send({ taskId, status: checkbox.checked });

  if (checkbox.checked) {
    taskElement.classList.add("done");
  } else {
    taskElement.classList.remove("done");
  }
}

function addTask() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  const request = new FXMLHttpRequest();

  request.open("POST", "");
  request.onload = function(newTask) {
    printTask(newTask);
  };
  request.send({ title: title, description: description, status: false });

  popUp.classList.remove("active");
  document.getElementById("title").value = "";        
  document.getElementById("description").value = "";
}

function deleteTask(event){
    const taskElement = event.target.closest(".task");
    const taskId = parseInt(taskElement.querySelector(".task-id").value);
    const request = new FXMLHttpRequest();
    request.open("DELETE", "");
    request.onload = function() {
        taskElement.remove();
    };
    request.send({ "taskId": taskId });
}

function editTask(event) {
    console.log("Edit task");
    editedTask = event.target.closest(".task");
    const titleElement = editedTask.querySelector(".task-title");
    const descriptionElement = editedTask.querySelector(".task-description");

    // Get the current title and description values
    const currentTitle = titleElement.textContent;
    const currentDescription = descriptionElement.textContent;

    // Set the current values in the popup window
    document.getElementById("editTitle").value = currentTitle;
    document.getElementById("editDescription").value = currentDescription;

    // Show the popup window
    editPopUp.classList.add("active");
}

function updateTask(){
    const taskId = parseInt(editedTask.querySelector(".task-id").value);
    const titleElement = editedTask.querySelector(".task-title");
    const descriptionElement = editedTask.querySelector(".task-description");
    const newTitle = document.getElementById("editTitle").value;
    const newDescription = document.getElementById("editDescription").value;

    // Perform the update request
    const request = new FXMLHttpRequest();
    request.open("PUT", "");
    request.send({ taskId, title: newTitle, description: newDescription });

    // Update the task element with the new values
    titleElement.textContent = newTitle;
    descriptionElement.textContent = newDescription;

    // Hide the popup window
    editPopUp.classList.remove("active");
}

