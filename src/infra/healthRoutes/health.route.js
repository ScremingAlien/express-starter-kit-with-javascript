import { Router } from "express";
import HealthController from "./health.controller.js";

const router = Router();
const healthController = new HealthController();

router.get("/live", healthController.liveChecker);
router.get("/ready", healthController.reportChecker);
router.get("/", healthController.baseChecker);

export default router;
