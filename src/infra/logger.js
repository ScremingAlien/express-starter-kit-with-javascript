import pino from "pino";

import { getRequestId } from "./request-context.js";

const isProd = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: {
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  mixin() {
    const requestId = getRequestId();
    return requestId ? { requestId } : {};
  },
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: { colorize: true },
      }
    : undefined,
});
