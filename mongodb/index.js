const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Todo = require("./models/todoModel");

dotenv.config();

const app = express();
app.listen(5000, () => {
  console.log("Server started");
});

app.use(express.json());

mongoose.connect(
  process.env.MDB_CONNECTION_STRING,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connected");
  }
);

// app.get("/test", (req, res) => {
//   const obj = {
//     name: "John",
//     adress: "Main street 1",
//   };
//   res.json(obj);
// });

app.post("/todo", async (req, res) => {
  const todo = req.body;

  const newTodo = new Todo({
    name: todo.name,
  });

  const savedTodo = await newTodo.save();

  res.json(savedTodo);
});

app.get("/todo", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;

  const todoItem = await Todo.findById(id);

  if (!todoItem) {
    return res.status(404).end();
  }

  res.json(todoItem);
});

app.put("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const newTodo = req.body;

  const todoItem = await Todo.findById(id);

  if (!todoItem) {
    return res.status(404).end();
  }

  todoItem.name = newTodo.name;
  const savedTodo = await todoItem.save();

  res.json(savedTodo);
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;

  const deletedTodo = await Todo.findByIdAndDelete(id);

  res.json(deletedTodo);
});
