import { logger } from "../../infra/logger.js";
import eventBus from "../../utils/eventBus.js";

eventBus.on("todo.created", (data) => {
  logger.info("📢  todo.created event is Called !");
});
