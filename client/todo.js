getTodoData();

let todo;

async function getTodoData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const res = await axios.get(`http://localhost:5000/todo/${id}`);
  todo = res.data;

  renderTodo();
}

function renderTodo() {
  document.getElementById("todo").innerHTML = `<h2>${todo.name}</h2>
  <button onclick="completeTodo()">Complete</button>`;
}

async function completeTodo() {
  await axios.delete(`http://localhost:5000/todo/${todo._id}`);
  window.location.href = "/";
}
