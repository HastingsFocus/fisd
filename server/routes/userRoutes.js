import express from "express";

import {
  inviteUser,
  getUsers,
  updateUserStatus,
} from "../controllers/userController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.post("/invite", inviteUser);
router.get("/", getUsers);
router.patch("/:id/status", updateUserStatus);

export default router;