import { initDatabase } from "./db.bootstrap.js";
import { logger } from "../infra/logger.js";

export async function bootstrapApp() {
  logger.info("Bootstrapping service...");

  // call your extra services or setup here
  await initDatabase();

  logger.info("All dependencies initialized");
}
