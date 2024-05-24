import express from "express";
import cors from "cors";
import indexRouter from "./routes/indexRouter.js"
import taskRouter from "./routes/TaskRouter.js"
import statusRouter from "./routes/StatusRouter.js";
import historyRouter from "./routes/HistoryRouter.js"

const server = express();

server.get("/", (req, res) => {
  res.send("Welcome to MEDNAT")
})

//Added Express here because it didn't allow me to make a JSON formatted post
server.use(express.json({ limit: "50mb" }));
//added CORS to be able to make requests to a different domain. In this case, I am trying to make a request from http://localhost:3000 to http://localhost:3001, and I couldn't see the tasks in the browser because of that
server.use(cors());

//Routes
server.use("/task", taskRouter);
server.use("/status", statusRouter);
server.use("/history", historyRouter);
server.use("/", indexRouter);

export default server;
