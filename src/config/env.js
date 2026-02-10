import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { logger } from "../infra/logger.js";

// resolve dirname (ESM-safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Decide env file
const ENV_FILE = process.env.NODE_ENV === "production" ? ".env.production" : ".env";

// Load env ASAP
dotenv.config({
  path: path.resolve(__dirname, `../../${ENV_FILE}`),
});

// Small helper (runtime safety > TS types)
function required(name) {
  const value = process.env[name];
  if (!value) {
    logger.fatal(`Missing required env: ${name}`);
    process.exit(1);
  }
  return value;
}

// Export normalized env config
export const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV ?? "development",

  PORT: Number(process.env.PORT ?? 5000),

  DB_URL: required("DB_URL"),
  DB_NAME: process.env.DB_NAME,

  // future-proof
  SERVICE_NAME: process.env.SERVICE_NAME ?? "todo-service",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
});
