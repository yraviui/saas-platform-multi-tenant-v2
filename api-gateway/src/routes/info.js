import express from "express";
import services from "../config/services.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
    environment: process.env.NODE_ENV || "development",
    services: Object.entries(services).map(([key, service]) => ({
      key,
      name: service.name,
      url: service.url,
    })),
    timestamp: new Date().toISOString(),
  });
});

export default router;