import dotenv from "dotenv";

dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5003,
  serviceName: process.env.SERVICE_NAME || "ms-03-user-service",
  mongodbUri: process.env.MONGODB_URI || "mongodb+srv://yravi:Test1234@cluster0.xau9o.mongodb.net/saas-multi-tanent-01-auth-db"
};

export default config;