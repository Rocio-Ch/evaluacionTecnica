import statusController from "../controllers/statusController.js";
import { Router } from "express";

const statusRouter = Router();

// Routes
statusRouter.get("/", statusController.getAllStatus)
statusRouter.get("/:id", statusController.getStatus) 

export default statusRouter;