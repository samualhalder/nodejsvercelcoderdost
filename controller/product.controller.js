const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

exports.createProduct = (req, res) => {
  const newProduct = req.body;
  //console.log(newProduct);

  products.push(newProduct);
  res.sendStatus(201, { newProduct });
};

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductByID = (req, res) => {
  const id = +req.params.id;
  const product = products.filter((pro) => pro.id === id);
  //console.log(product);
  res.json(product);
};

exports.replaceProductByID = (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((pro) => pro.id === id);
  products.splice(index, 1, { ...req.body });
  res.sendStatus(202);
};
exports.updateProductByID = (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((pro) => pro.id === id);
  const product = products[index];
  products.splice(index, 1, { ...product, ...req.body });
  res.sendStatus(202);
};
exports.deleteProductById = (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((pro) => pro.id === id);
  products.splice(index, 1);
  res.sendStatus(200);
};
