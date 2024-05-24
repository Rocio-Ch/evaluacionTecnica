import statusController from "../controllers/statusController.js";
import { Router } from "express";

const statusRouter = Router();

// Routes
statusRouter.get("/", statusController.getAllStatus)

export default statusRouter;