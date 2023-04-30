const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

function addTask() {
	const task = taskInput.value;
	if (task !== "") {
		const newTask = document.createElement("li");
		newTask.innerHTML = `<span>${task}</span><button onclick="removeTask(this)">Remove</button>`;
		taskList.appendChild(newTask);
		taskInput.value = "";
	}
}

function removeTask(button) {
	const li = button.parentElement;
	taskList.removeChild(li);
}
