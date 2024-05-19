import historyController from "../controllers/historyController.js";
import { Router } from "express";

const historyRouter = Router();

// Routes
historyRouter.get("/:id", historyController.getHistory) 

export default historyRouter;