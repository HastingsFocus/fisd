import express from "express";

import {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  publishNews,
  archiveNews,
  getPublishedNews,
  getPublishedNewsById,
} from "../controllers/newsController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/newsUploadMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
// These must come before router.use(protect).
router.get("/public", getPublishedNews);
router.get("/public/:id", getPublishedNewsById);

// PROTECTED CMS ROUTES
router.use(protect);
router.use(authorize("admin", "editor"));

router.get("/", getNews);
router.get("/:id", getNewsById);

router.post("/", upload.single("coverImage"), createNews);

router.put("/:id", upload.single("coverImage"), updateNews);

router.patch("/:id/publish", publishNews);
router.patch("/:id/archive", archiveNews);

export default router;