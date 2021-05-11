const fs = require("fs");
const colors = require("colors");

// console.log("Start bestand lezen");
// fs.readFile("./data.json", (err, data) => {
//   if (err) throw err;

//   const pieter = JSON.parse(data.toString());
//   console.log(pieter.email);
// });
// console.log("Klaar");

// console.log("Start bestand lezen");
// const buffer = fs.readFileSync("./hello.txt");
// const text = buffer.toString();
// console.log(text);

// const data = {
//   name: "John",
//   email: "john@gmail.com",
// };
// const json = JSON.stringify(data);

// fs.writeFileSync("./person.json", json);

const data = {
  name: "John",
  email: "john@gmail.com",
};
const json = JSON.stringify(data);

if (!fs.existsSync("./db")) {
  fs.mkdirSync("./db");
}

fs.writeFileSync("./db/db.json", json);

console.log("Hello world".rainbow);
