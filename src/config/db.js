import mongoose from "mongoose";
import { logger } from "../infra/logger.js";

const connectDB = async () => {
  // These options handle deprecated warnings and improve stability
  const connectionOptions = {
    // Mongoose 6+ makes these default, but it's good practice to be explicit
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // useCreateIndex: true, // Mongoose 6+ defaults this to true
  };

  try {
    const connection = await mongoose.connect(process.env.DB_URL, connectionOptions);

    logger.info(`MongoDB Connected: ${connection.connection.host}`);

    mongoose.connection.on("disconnected", () => {
      logger.info("⚠️ Mongoose default connection disconnected");
    });

    mongoose.connection.on("error", (err) => {
      logger.fatal(`❌ Mongoose default connection error: ${err.message}`);
    });
  } catch (error) {
    // 4. Handle Initial Connection Failure
    logger.fatal(`🚨 MongoDB initial connection failed: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

const closeDB = () => {
  mongoose.connection.close(() => {
    logger.info("Database connection disconnected through app termination.");
    process.exit(0);
  });
};

// Listen for termination signals (SIGINT, SIGTERM)
process.on("SIGINT", closeDB);
process.on("SIGTERM", closeDB);

export default connectDB;
