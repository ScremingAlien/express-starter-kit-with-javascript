import { logger } from "../../infra/logger.js";
import eventBus from "../../utils/eventBus.js";

/**
 * Listen for todo events
 */
eventBus.on("todo.created", (data) => {
  logger.info("📢  todo.created event is Called !");
});
