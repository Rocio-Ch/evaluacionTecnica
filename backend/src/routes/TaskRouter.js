import taskController from "../controllers/taskController.js";
import { Router } from "express";

const taskRouter = Router();

// Routes
taskRouter.get("/", taskController.getTasks)
taskRouter.post("/", taskController.createTask)
taskRouter.get("/:id", taskController.getTask) 
taskRouter.put("/:id", taskController.updateTask)
taskRouter.delete("/:id", taskController.deleteTask)

export default taskRouter;