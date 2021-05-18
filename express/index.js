const express = require("express");
const fs = require("fs");

const app = express();
app.listen(5000);

app.use(express.json());

// app.get("/test", (req, res) => {
//   const obj = {
//     name: "John",
//     adress: "Main street 1",
//   };
//   res.json(obj);
// });

app.post("/todo", (req, res) => {
  const todo = req.body;

  let json = fs.readFileSync("./db/todos.json").toString();
  const todos = JSON.parse(json);

  todos.push(todo);

  json = JSON.stringify(todos);

  fs.writeFileSync("./db/todos.json", json);

  res.end();
});

app.get("/todo", (req, res) => {
  let json = fs.readFileSync("./db/todos.json").toString();
  const todos = JSON.parse(json);

  res.json(todos);
});

app.get("/todo/:name", (req, res) => {
  const name = req.params.name;

  let json = fs.readFileSync("./db/todos.json").toString();
  const todos = JSON.parse(json);

  const todoItem = todos.find((item) => {
    return item.todo === name;
  });

  if (!todoItem) {
    return res.status(404).end();
  }

  res.json(todoItem);
});

app.put("/todo/:name", (req, res) => {
  const name = req.params.name;
  const newTodo = req.body;

  let json = fs.readFileSync("./db/todos.json").toString();
  const todos = JSON.parse(json);

  const todoItem = todos.find((item) => {
    return item.todo === name;
  });

  if (!todoItem) {
    return res.status(404).end();
  }

  const index = todos.indexOf(todoItem);
  todos[index] = newTodo;

  json = JSON.stringify(todos);
  fs.writeFileSync("./db/todos.json", json);

  res.end();
});

app.delete("/todo/:name", (req, res) => {
  const name = req.params.name;

  let json = fs.readFileSync("./db/todos.json").toString();
  const todos = JSON.parse(json);

  const todoItem = todos.find((item) => {
    return item.todo === name;
  });

  if (!todoItem) {
    return res.status(404).end();
  }

  const index = todos.indexOf(todoItem);
  todos.splice(index, 1);

  json = JSON.stringify(todos);
  fs.writeFileSync("./db/todos.json", json);

  res.end();
});
