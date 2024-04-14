const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const server = express();
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.router");
// MIDDLEWARES
server.use(express.json()); //build in middleware -> body perser
server.use(morgan("dev"));
//DB connection code
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-test");
  console.log("database connected!");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//MVC -> Model-View-Controle

server.use("/products", productRouter.router);
server.use("/users", userRouter.router);



server.listen(8080, () => {
  console.log("server is started!!!");
});
