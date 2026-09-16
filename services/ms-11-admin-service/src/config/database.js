import mongoose from "mongoose";

import config from "./index.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongodbUri);

    console.log(
      `[${config.serviceName}] MongoDB connected successfully`
    );

    console.log(
      `[${config.serviceName}] MongoDB database: ${mongoose.connection.name}`
    );

    return mongoose.connection;
  } catch (error) {
    console.error(
      `[${config.serviceName}] MongoDB connection failed`
    );

    console.error(error.message);

    throw error;
  }
};

export const getDatabaseStatus = () => {
  const state = mongoose.connection.readyState;

  const states = {
    0: "DISCONNECTED",
    1: "CONNECTED",
    2: "CONNECTING",
    3: "DISCONNECTING"
  };

  return {
    status: states[state] || "UNKNOWN",
    connected: state === 1,
    name: mongoose.connection.name || null
  };
};