const express = require("express");
const connect = require("./dbConnect");
const { createServer } = require("node:http");
const cors = require("cors");
const ioHandler = require("./ioHandler");
const userRoute = require("./Routes/userRoute");
const authRoutes = require("./Routes/auth");

const app = express();
const server = createServer(app);

connect.connect();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/"],
  })
);
app.use("/user", userRoute);
app.use("/auth", authRoutes);

ioHandler.Handler(server);

server.listen(4000, () => console.log("listening on port 4000!!!"));
