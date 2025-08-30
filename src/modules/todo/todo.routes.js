import { Router } from "express";
import TodoController from "./todo.controller.js";
import validate from "../../middlewares/default/validate.js";
import rateLimiter from "../../middlewares/default/rateLimiter.js";

const router = Router();
const todoController = new TodoController();

router.get("/", todoController.getAll);
router.post("/", todoController.create); // <-- new

export default router;
