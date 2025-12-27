let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "All";

const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

/* ---------- Save ---------- */
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

/* ---------- Add Task ---------- */
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;

  todos.push({
    id: Date.now(),
    text: taskInput.value,
    category: categorySelect.value,
    completed: false
  });

  taskInput.value = "";
  saveTodos();
  renderTodos();
});

/* ---------- Toggle & Delete (Event Delegation) ---------- */
taskList.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.type === "checkbox") {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  if (e.target.dataset.delete) {
    todos = todos.filter(todo => todo.id !== id);
  }

  saveTodos();
  renderTodos();
});

/* ---------- Filter ---------- */
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

/* ---------- Render ---------- */
const renderTodos = () => {
  taskList.innerHTML = "";

  const filtered = todos.filter(todo =>
    currentFilter === "All" || todo.category === currentFilter
  );

  filtered.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" data-id="${todo.id}" ${todo.completed ? "checked" : ""}>
      <span class="${todo.completed ? "done" : ""}">
        ${todo.text}
      </span>
      <span class="category">${todo.category}</span>
      <button data-delete="${todo.id}">X</button>
    `;
    taskList.appendChild(li);
  });

  const workCount = todos.filter(t => t.category === "Work").length;
  const personalCount = todos.filter(t => t.category === "Personal").length;

  taskCount.innerText = `Work: ${workCount} | Personal: ${personalCount}`;
};

/* ---------- Init ---------- */
renderTodos();
