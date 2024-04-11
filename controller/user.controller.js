const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;

exports.createUser = (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  users.push(newUser);
  res.sendStatus(201, { newUser });
};

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserByID = (req, res) => {
  const id = +req.params.id;
  const User = users.filter((pro) => pro.id === id);
  console.log(User);
  res.json(User);
};

exports.replaceUserByID = (req, res) => {
  const id = +req.params.id;
  const index = users.findIndex((pro) => pro.id === id);
  users.splice(index, 1, { ...req.body });
  res.sendStatus(202);
};
exports.updateUserByID = (req, res) => {
  const id = +req.params.id;
  const index = users.findIndex((pro) => pro.id === id);
  const User = users[index];
  users.splice(index, 1, { ...User, ...req.body });
  res.sendStatus(202);
};
exports.deleteUserById = (req, res) => {
  const id = +req.params.id;
  const index = users.findIndex((pro) => pro.id === id);
  users.splice(index, 1);
  res.sendStatus(200);
};
