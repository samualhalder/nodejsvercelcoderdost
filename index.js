const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const server = express();
const path = require("path");
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.router");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// MIDDLEWARES
server.use(cors());
server.use(express.json()); //build in middleware -> body perser
server.use(express.static(path.resolve(__dirname, "dist")));
server.use(morgan("default"));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
// DB connection code
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("database connected!");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// MVC -> Model-View-Controle

server.listen(process.env.PORT, () => {
  console.log(`server is started at port ${process.env.PORT}`);
});
