const express = require("express");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
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
  console.log(req.query);
  if (req.query.password == "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

//API-END POINTS

//Create POST /product
server.post("/products", (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);

  products.push(newProduct);
  res.sendStatus(201, { newProduct });
});

//Read GET /products
server.get("/products", (req, res) => {
  res.json(products);
});

//Read GET /products/:id
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.filter((pro) => pro.id === id);
  console.log(product);
  res.json(product);
});

//Update PUT /product   <- it rewrite hole item
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((pro) => pro.id === id);
  products.splice(index, 1, { ...req.body });
  res.sendStatus(202);
});

//Update PATCH /product   <- it overerite requsted items
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((pro) => pro.id === id);
  const product = products[index];
  products.splice(index, 1, { ...product, ...req.body });
  res.sendStatus(202);
});

//Delete DELETE/products 
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((pro) => pro.id === id);
  products.splice(index, 1);
  res.sendStatus(200);
});

server.patch("/", (req, res) => {
  res.json({ type: "patch" });
});
server.delete("/", (req, res) => {
  res.json({ type: "delete" });
});

server.listen(8080, () => {
  console.log("server is started!!!");
});
