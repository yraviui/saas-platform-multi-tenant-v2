import express from "express";
import cors from "cors";
import helmet from "helmet";

import config from "./config/index.js";
import { connectDatabase } from "./config/database.js";
import healthRoutes from "./routes/healthRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health
app.use("/health", healthRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

// Error handler
app.use(errorHandler);

// Start server after MongoDB connection
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.log(
        `[${config.serviceName}] running on http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.error(
      `[${config.serviceName}] startup failed`
    );

    process.exit(1);
  }
};

startServer();