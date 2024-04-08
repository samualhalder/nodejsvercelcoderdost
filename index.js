const express = require("express");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = fs.readFileSync("data.json", "utf-8");
const morgan = require("morgan");

const server = express();
// MIDDLEWARES
server.use(express.json()); //build in middleware -> body perser
server.use(morgan("dev"));

server.use((req, res, next) => {
  console.log(req.ip);
  next();
});

const auth = (req, res, next) => {
  console.log(req.body);
  if (req.body.password == "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

//API-END POINTS
server.get("/", (req, res) => {
  res.json(data);
});

server.post("/", auth, (req, res) => {
  res.json({ type: "post" });
});
server.put("/", (req, res) => {
  res.json({ type: "put" });
});
server.patch("/", (req, res) => {
  res.json({ type: "patch" });
});
server.delete("/", (req, res) => {
  res.json({ type: "delete" });
});

server.listen(8080, () => {
  console.log("sercer is started!!!");
});
