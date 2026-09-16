import dotenv from "dotenv";

dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5006,
  serviceName: process.env.SERVICE_NAME || "ms-06-payment-service",
  mongodbUri: process.env.MONGODB_URI || "mongodb+srv://yravi:Test1234@cluster0.xau9o.mongodb.net/saas-multi-tanent-01-auth-db"
};

export default config;