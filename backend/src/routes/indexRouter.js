import indexController from "./../controllers/indexController.js";
import { Router } from "express";

const indexRouter = Router();

// Routes
indexRouter.get("/", indexController.index);

export default indexRouter;
