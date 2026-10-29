import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";

import productRoutes from "./routes/product.routes.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use(pinoHttp());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

app.use("/api/v1/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  req.log?.error({ err }, "Request failed");

  const status =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode < 500
      ? err.statusCode
      : 500;

  res.status(status).json({
    success: false,
    message:
      status === 500 ? "An unexpected server error occurred." : err.message,
  });
});

export default app;
