const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.router");
// MIDDLEWARES
server.use(express.json()); //build in middleware -> body perser
server.use(morgan("dev"));

//MVC -> Model-View-Controle

server.use("/products", productRouter.router);
server.use("/users", userRouter.router);

server.listen(8080, () => {
  console.log("server is started!!!");
});
