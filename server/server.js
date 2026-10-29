
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import vacancyRoutes from "./routes/vacancyRoutes.js";


import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Validate required environment configuration.
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing from your .env file.");
}

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error(
    "JWT_SECRET must be at least 32 characters long."
  );
}

// Security headers.
app.use(helmet());

// Allow requests from the configured frontend origins.
const allowedOrigins = (
  process.env.CLIENT_URLS ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header, such as curl.
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS."));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request bodies.
app.use(express.json({ limit: "1mb" }));

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

// Handle unknown routes and errors.
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB before accepting requests.
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`FISDEV CMS API running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start the FISDEV CMS API:", error.message);
    process.exit(1);
  }
};

startServer();
