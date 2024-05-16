import express from "express";
import indexRouter from "./routes/indexRouter.js"
import taskRouter from "./routes/TaskRouter.js"

const server = express();

server.get("/", (req, res) => {
  res.send("Test conocimientos tecnicos TANDEM")
})

server.use("/", indexRouter);
server.use("/task", taskRouter);

export default server;
