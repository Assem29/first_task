const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {
  const task = taskInput.value;
  if (task !== "") {
    const newTask = document.createElement("li");
    newTask.innerHTML = `<span>${task}</span>
                         <button onclick="editTask(this)">Edit</button>
                         <button onclick="completeTask(this)">Complete</button>
                         <button onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(newTask);
    saveTasks();
    taskInput.value = "";
  }
}

function editTask(button) {
  const li = button.parentElement;
  const span = li.querySelector("span");
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.innerText;
  input.classList.add("edit-input");
  li.insertBefore(input, span);
  li.removeChild(span);
  button.innerText = "Save";
  button.onclick = function () {
    span.innerText = input.value;
    li.removeChild(input);
    li.insertBefore(span, button);
    button.innerText = "Edit";
    button.onclick = function () {
      editTask(button);
    };
    saveTasks();
  };
}

function completeTask(button) {
  const li = button.parentElement;
  li.classList.toggle("completed");
  saveTasks();
  if (li.classList.contains("completed")) {
    setTimeout(function () {
      removeTask(button);
    }, 180000);
  }
}

function removeTask(button) {
  const li = button.parentElement;
  taskList.removeChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  const lis = taskList.querySelectorAll("li");
  for (let i = 0; i < lis.length; i++) {
    const span = lis[i].querySelector("span");
    const completed = lis[i].classList.contains("completed");
    tasks.push({ text: span.innerText, completed: completed });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    for (let i = 0; i < tasks.length; i++) {
      const newTask = document.createElement("li");
      newTask.innerHTML = `<span>${tasks[i].text}</span>
                           <button onclick="editTask(this)">Edit</button>
                           <button onclick="completeTask(this)" ${
                             tasks[i].completed ? "disabled" : ""
                           }>Complete</button>
                           <button onclick="removeTask(this)">Remove</button>`;
      if (tasks[i].completed) {
        newTask.classList.add("completed");
      }
      taskList.appendChild(newTask);
    }
  }
}
