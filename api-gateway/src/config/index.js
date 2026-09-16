import dotenv from "dotenv";

dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  serviceName: process.env.SERVICE_NAME || "api-gateway",
  apiPrefix: process.env.API_PREFIX || "/api",
};

export default config;