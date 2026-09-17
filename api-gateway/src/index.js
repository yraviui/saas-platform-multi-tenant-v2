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

/**
 * ============================================================
 * SECURITY
 * ============================================================
 */

app.use(helmet());

/**
 * ============================================================
 * REQUEST PROCESSING
 * ============================================================
 */

app.use(corsMiddleware);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

/**
 * ============================================================
 * LOGGING / REQUEST TRACING
 * ============================================================
 */

app.use(requestId);

app.use(logger);

/**
 * ============================================================
 * RATE LIMITING
 * ============================================================
 */

app.use(rateLimiter);

/**
 * ============================================================
 * GATEWAY ROUTES
 * ============================================================
 */

// Gateway health
app.use("/health", healthRoutes);

// Gateway information
app.use("/info", infoRoutes);

/**
 * ============================================================
 * MICROSERVICE PROXY ROUTES
 * ============================================================
 */

// MS-01 Auth Service
app.use(
  createServiceProxy(
    services.auth.url,
    "/api/auth"
  )
);

// MS-02 Tenant Service
app.use(
  createServiceProxy(
    services.tenant.url,
    "/api/tenant"
  )
);

// MS-03 User Service
app.use(
  createServiceProxy(
    services.user.url,
    "/api/user"
  )
);

// MS-04 Fund Service
app.use(
  createServiceProxy(
    services.fund.url,
    "/api/fund"
  )
);

// MS-05 Expenditure Service
app.use(
  createServiceProxy(
    services.expenditure.url,
    "/api/expenditure"
  )
);

// MS-06 Payment Service
app.use(
  createServiceProxy(
    services.payment.url,
    "/api/payment"
  )
);

// MS-07 Payment Method Service
app.use(
  createServiceProxy(
    services.paymentMethod.url,
    "/api/payment-method"
  )
);

// MS-08 Subscription Service
app.use(
  createServiceProxy(
    services.subscription.url,
    "/api/subscription"
  )
);

// MS-09 Report Service
app.use(
  createServiceProxy(
    services.report.url,
    "/api/report"
  )
);

// MS-10 Audit Service
app.use(
  createServiceProxy(
    services.audit.url,
    "/api/audit"
  )
);

// MS-11 Admin Service
app.use(
  createServiceProxy(
    services.admin.url,
    "/api/admin"
  )
);

/**
 * ============================================================
 * 404
 * ============================================================
 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    requestId: req.requestId
  });
});

/**
 * ============================================================
 * GLOBAL ERROR HANDLER
 * ============================================================
 */

app.use(errorHandler);

/**
 * ============================================================
 * START SERVER
 * ============================================================
 */

app.listen(config.port, "0.0.0.0", () => {
    console.log(`[${config.serviceName}] running on http://localhost:${config.port}`);
});