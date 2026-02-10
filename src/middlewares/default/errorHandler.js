import { logger } from "../../infra/logger.js";

export default function errorHandler(err, req, res, next) {
  logger.fatal(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
    data: null,
    route: req.originalUrl,
  });
}
