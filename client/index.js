let todos = [];

getTodos();

async function getTodos() {
  const res = await axios.get("http://localhost:5000/todo");
  todos = res.data;
  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById("todo-list");

  todoList.innerHTML = "";

  const todoElements = todos.map((todo) => {
    const el = document.createElement("div");
    el.innerHTML = `<a href="/todo.html?id=${todo._id}"><h2>${todo.name}</h2></a>`;
    return el;
  });

  todoElements.forEach((el) => {
    todoList.append(el);
  });
}

document.getElementById("new-todo").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("new-todo-name");
  const name = nameInput.value;

  const newTodo = {
    name,
  };

  await axios.post("http://localhost:5000/todo", newTodo);

  nameInput.value = "";
  getTodos();
});
