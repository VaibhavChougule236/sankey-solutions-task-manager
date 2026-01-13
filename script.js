const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");

taskInput.addEventListener("input", () => {
    addTaskBtn.disabled = taskInput.value.trim() === "";
});

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const serial = document.createElement("span");
    serial.className = "serial";

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    completeBtn.addEventListener("click", () => {
        span.classList.toggle("completed");
        completeBtn.textContent = span.classList.contains("completed")
            ? "Completed"
            : "Complete";
        updateCount();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateCount();
        updateSerialNumbers();
    });

    li.appendChild(serial);
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    addTaskBtn.disabled = true;
    updateCount();
    updateSerialNumbers();
}

function updateCount() {
    const tasks = taskList.children;
    let completed = 0;

    for (let task of tasks) {
        if (task.querySelector(".completed")) {
            completed++;
        }
    }

    totalCount.textContent = tasks.length;
    completedCount.textContent = completed;
}

function updateSerialNumbers() {
    const tasks = taskList.children;
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].querySelector(".serial").textContent = (i + 1) + ". ";
    }
}
