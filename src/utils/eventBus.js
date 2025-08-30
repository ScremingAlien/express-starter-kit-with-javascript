import { EventEmitter } from "events";

class EventBus extends EventEmitter {}
const eventBus = new EventBus();

// Optional: set max listeners (default 10)
eventBus.setMaxListeners(20);

export default eventBus;
