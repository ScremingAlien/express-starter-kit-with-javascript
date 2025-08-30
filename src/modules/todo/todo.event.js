import eventBus from "../../utils/eventBus.js";

/**
 * Listen for todo events
 */
eventBus.on("todo.created", (data) => {
  console.log("📢  todo.created event is Called !");
});
