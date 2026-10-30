
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

export const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // Check whether the request contains a Bearer token.
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please log in to continue.",
      });
    }

    const token = authorization.split(" ")[1];

    // Verify JWT token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the authenticated user.
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "This account is unavailable.",
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

    // Attach authenticated user to the request.
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
    // Ensure the user is authenticated.
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Check whether the user's role is permitted.
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
};
