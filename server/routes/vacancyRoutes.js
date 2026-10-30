
import express from "express";

import {
  createVacancy,
  getVacancies,
  getVacancyById,
  updateVacancy,
  publishVacancy,
  archiveVacancy,
  getPublishedVacancies,
  getPublishedVacancyById,
} from "../controllers/vacancyController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC VACANCY ROUTES
// ==========================================

// Anyone can view published vacancies.
router.get("/public", getPublishedVacancies);

router.get("/public/:id", getPublishedVacancyById);

// ==========================================
// AUTHENTICATED CMS ROUTES
// ==========================================

// All CMS routes require authentication.
router.use(protect);

// Both admins and editors can view vacancies.
router.get(
  "/",
  authorize("admin", "editor"),
  getVacancies
);

router.get(
  "/:id",
  authorize("admin", "editor"),
  getVacancyById
);

// Both admins and editors can create vacancies.
router.post(
  "/",
  authorize("admin", "editor"),
  createVacancy
);

// Both admins and editors can edit vacancies.
router.put(
  "/:id",
  authorize("admin", "editor"),
  updateVacancy
);

// Both admins and editors can publish vacancies.
router.patch(
  "/:id/publish",
  authorize("admin", "editor"),
  publishVacancy
);

// Both admins and editors can archive vacancies.
router.patch(
  "/:id/archive",
  authorize("admin", "editor"),
  archiveVacancy
);

export default router;
