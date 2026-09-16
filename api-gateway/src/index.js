import express from "express";
import helmet from "helmet";

import config from "./config/index.js";
import corsMiddleware from "./middleware/cors.js";
import logger from "./middleware/logger.js";
import rateLimiter from "./middleware/rateLimiter.js";
import requestId from "./middleware/requestId.js";
import errorHandler from "./middleware/errorHandler.js";

import healthRoutes from "./routes/health.js";
import infoRoutes from "./routes/info.js";

import services from "./config/services.js";
import { createServiceProxy } from "./proxy/serviceProxy.js";

const app = express();

// Security
app.use(helmet());

// Request processing
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging / tracing
app.use(requestId);
app.use(logger);

// Rate limiting
app.use(rateLimiter);

// Gateway routes
app.use("/health", healthRoutes);
app.use("/info", infoRoutes);

// Auth Service
app.use( "/api/auth", createServiceProxy( services.auth.url, "/api/auth" ) );

// Tenant Service
app.use( "/api/tenant", createServiceProxy( services.tenant.url, "/api/tenant" ) );

// user Service
app.use( "/api/user", createServiceProxy( services.user.url, "/api/user" ) );

// fund Service
app.use( "/api/fund", createServiceProxy( services.fund.url, "/api/fund" ) );

// expenditure Service
app.use( "/api/expenditure", createServiceProxy( services.expenditure.url, "/api/expenditure" ) );

// payment Service
app.use( "/api/payment", createServiceProxy( services.payment.url, "/api/payment" ) );

// paymentMethod Service
app.use( "/api/payment-method", createServiceProxy( services.paymentMethod.url, "/api/payment-method" ) );

// subscription Service
app.use( "/api/subscription", createServiceProxy( services.subscription.url, "/api/subscription" ) );

// report Service
app.use( "/api/report", createServiceProxy( services.report.url, "/api/report" ) );

// audit Service
app.use( "/api/audit", createServiceProxy( services.audit.url, "/api/audit" ) );

// admin Service
app.use( "/api/admin", createServiceProxy( services.admin.url, "/api/admin" ) );

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    requestId: req.requestId,
  });
});

// Error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `[${config.serviceName}] running on http://localhost:${config.port}`
  );
});