import express from "express";
import cors from "cors";
import indexRouter from "./routes/indexRouter.js"
import taskRouter from "./routes/TaskRouter.js"

const server = express();

server.get("/", (req, res) => {
  res.send("Test conocimientos tecnicos TANDEM")
})


//agregue cors para poder realizar solicitudes a un dominio diferente. En este caso, estoy intentando hacer una solicitud desde http://localhost:3000 a http://localhost:3001 y no podia ver las tareas en el navegador a causa de ello
server.use(cors());

//Routes
server.use("/", indexRouter);
server.use("/task", taskRouter);

export default server;
