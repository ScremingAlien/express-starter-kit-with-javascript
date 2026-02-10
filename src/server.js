// import "dotenv/config";
import "./config/env.js";
import { createServer } from "http";

import { createApp } from "./app.js";
import { bootstrapApp } from "./bootstrap/index.js";
import { logger } from "./infra/logger.js";

async function startServer() {
  try {
    //  Init infra dependencies
    await bootstrapApp();

    //  Create HTTP app
    const app = createApp();
    const server = createServer(app);

    const port = Number(process.env.PORT) || 3000;

    server.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });

    //  Graceful shutdown
    const shutdown = async (signal) => {
      logger.warn(`${signal} received. Shutting down...`);
      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    logger.fatal(err, "Startup failed");
    process.exit(1);
  }
}

startServer();
