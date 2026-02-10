import mongoose from "mongoose";

async function withTimeout(fn, timeoutMs) {
  return Promise.race([
    fn(),
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
  ]);
}

async function checkMongo() {
  const start = Date.now();
  try {
    await withTimeout(() => mongoose.connection.db.admin().ping(), 5000);
    return { status: "up", latencyMs: Date.now() - start };
  } catch (e) {
    return { status: "down", error: e.message };
  }
}

// if redis is available
async function checkRedis() {
  const start = Date.now();
  try {
    // await withTimeout(() => redis.ping());
    return { status: "up", latencyMs: Date.now() - start };
  } catch (e) {
    return { status: "down", error: e.message };
  }
}

export async function getHealthReport() {
  const checks = await Promise.allSettled([checkMongo(), checkRedis()]);

  const [monogo, redis] = checks.map((r) =>
    r.status === "fulfilled" ? r.value : { status: "down", error: "crashed" }
  );

  const deps = {
    mongo: monogo,
    redis: redis,
  };

  const failed = Object.values(deps).some((d) => d.status === "down");

  return {
    status: failed ? "unhealthy" : "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: process.env.SERVICE_NAME,
    version: process.env.APP_VERSION,
    dependencies: deps,
  };
}
