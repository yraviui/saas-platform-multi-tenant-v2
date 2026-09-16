import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

export default router;