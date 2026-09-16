import express from "express";

import config from "../config/index.js";
import { getDatabaseStatus } from "../config/database.js";

const router = express.Router();

/**
 * GET /health
 *
 * Health check for Auth Service.
 *
 * Validates:
 * 1. tenant Service is running
 * 2. MongoDB connection status
 */
router.get("/", (req, res) => {
  const database = getDatabaseStatus();

  const databaseUp = database.connected;

  res.status(databaseUp ? 200 : 503).json({
    success: databaseUp,

    service: config.serviceName,

    status: databaseUp ? "UP" : "DOWN",

    database: {
      status: database.status,
      connected: database.connected,
      name: database.name
    },

    timestamp: new Date().toISOString()
  });
});

export default router;