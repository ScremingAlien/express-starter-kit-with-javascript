import connectDB from "../config/db.js";
import { logger } from "../infra/logger.js";

export async function initDatabase() {
  logger.info("Connecting to database...");
  await connectDB();
  logger.info("Database connected");
}
