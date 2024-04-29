const addTask = document.querySelector(".addTask");
let listOfTasks = document.querySelector(".tasks");
const clearTasks = document.querySelector(".clear");
const searchForm = document.querySelector(".search");
let numberOftaskDescription = clearTasks.querySelector(".TasksDescription");

function updateMessage() {
  let numTasks = listOfTasks.children.length;
  numberOftaskDescription.textContent = `You have ${numTasks} pending tasks.`;
}

function filterTasks(term) {
  const foundedTasks = listOfTasks.querySelectorAll(".description");
  Array.from(foundedTasks)
    .filter((task) => !task.textContent.toLowerCase().includes(term))
    .forEach((task) => task.parentElement.classList.add("hide"));
  Array.from(foundedTasks)
    .filter((task) => task.textContent.includes(term))
    .forEach((task) => task.parentElement.classList.remove("hide"));
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(listOfTasks.innerHTML));
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    return;
  } else {
    listOfTasks.innerHTML = tasks;
    updateMessage();
  }
}
getTasks();
updateMessage();

searchForm.addEventListener("keyup", (event) => {
  event.preventDefault();
  let searchTerm = searchForm.needTasks.value.trim().toLowerCase();
  filterTasks(searchTerm);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchForm.reset();
  let searchTerm = searchForm.needTasks.value.trim();
  filterTasks(searchTerm);
});

addTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTaskDescription = addTask.newTaskToAdd.value.trim();
  if (newTaskDescription) {
    listOfTasks.innerHTML += `
    <li class="task">
        <p class="description">${newTaskDescription}</p>
        <button type="button" class="delatebutton" id="b3">
         <i class="bi bi-trash delete"></i>
        </button>
    </li>`;
    updateMessage();
    addTask.reset();
    saveTasks();
  }
});

listOfTasks.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.parentElement.remove();
    saveTasks();
    updateMessage();
  }
});

clearTasks.addEventListener("submit", (event) => {
  event.preventDefault();
  listOfTasks.innerHTML = "";
  saveTasks();
  updateMessage();
});
