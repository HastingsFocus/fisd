
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import vacancyRoutes from "./routes/vacancyRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Validate required environment configuration.
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing from your environment variables.");
}

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long.");
}

// Security headers.
app.use(helmet());

// CORS configuration.
const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim()),
  ...(process.env.CLIENT_URLS || "")
    .split(",")
    .map((origin) => origin.trim()),
]
  .map((origin) => origin.replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as Postman and curl.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked request from: ${origin}`);

      return callback(new Error("Origin not allowed by CORS."));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Parse JSON request bodies.
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Basic API request limit.
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      message: "Too many requests. Please try again later.",
    },
  })
);

// Root endpoint.
app.get("/", (req, res) => {
  res.json({
    message: "FISDEV CMS API is running.",
  });
});

// Health check.
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "FISDEV CMS API",
    timestamp: new Date().toISOString(),
  });
});

// API routes.
app.use("/api/auth", authRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/news", newsRoutes);

// Handle unknown routes and errors.
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB before accepting requests.
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`FISDEV CMS API running on port ${PORT}`);
      console.log(`Health check: https://fisd.onrender.com/api/health`);
      console.log("Allowed frontend origins:", allowedOrigins);
    });
  } catch (error) {
    console.error("Failed to start the FISDEV CMS API:", error.message);
    process.exit(1);
  }
};

startServer();
