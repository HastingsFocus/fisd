import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

export const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please log in to continue.",
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    // Check whether the account exists and is active.
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "This account is unavailable.",
      });
    }

    // Only verified accounts can access the CMS.
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email address.",
      });
    }

    // Invalidate tokens issued before a password change.
    if (
      user.passwordChangedAt &&
      decoded.iat <=
        Math.floor(user.passwordChangedAt.getTime() / 1000)
    ) {
      return res.status(401).json({
        success: false,
        message: "Your password has changed. Please log in again.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Your session is invalid or has expired. Please log in again.",
    });
  }
};

// ==========================================
// ROLE-BASED AUTHORIZATION MIDDLEWARE
// ==========================================

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
};