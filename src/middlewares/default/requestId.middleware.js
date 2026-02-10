import { randomUUID } from "crypto";

import { requestContext } from "../../infra/request-context.js";

export function requestIdMiddleware(req, res, next) {
  const incomingId = req.header("x-request-id");
  const requestId = incomingId || randomUUID();

  requestContext.run({ requestId }, () => {
    res.setHeader("x-request-id", requestId);
    next();
  });
}
