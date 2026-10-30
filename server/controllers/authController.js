import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/email.js";

const frontendURL = () =>
  (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, "");

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  emailVerified: user.emailVerified,
  isActive: user.isActive,
});

const validEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validPassword = (password) =>
  typeof password === "string" && password.length >= 12;

// @desc    Accept invitation and set password
// @route   POST /api/auth/accept-invitation
// @access  Public, requires a valid invitation token
export const acceptInvitation = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Invitation token, password and confirmation are required.",
      });
    }

    if (!validPassword(password)) {
      return res.status(400).json({
        message: "Your password must contain at least 8 characters.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    const hashedToken = hashToken(token);

    const user = await User.findOne({
      invitationToken: hashedToken,
      invitationExpires: { $gt: new Date() },
    }).select("+invitationToken +invitationExpires");

    if (!user) {
      return res.status(400).json({
        message: "This invitation link is invalid or has expired.",
      });
    }

    if (user.invitationAcceptedAt) {
      return res.status(400).json({
        message: "This invitation has already been accepted.",
      });
    }

    user.password = password;
    user.isActive = true;
    user.emailVerified = true;
    user.invitationAcceptedAt = new Date();

    user.invitationToken = undefined;
    user.invitationExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Your invitation has been accepted. You can now log in.",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Accept invitation error:", error);

    return res.status(500).json({
      message: "Unable to accept your invitation. Please try again.",
    });
  }
};

// @desc    Log in to CMS
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!validEmail(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is inactive. Please contact the administrator.",
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Your email address has not been verified.",
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Unable to log in. Please try again.",
    });
  }
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validEmail(email.trim().toLowerCase())) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      isActive: true,
      emailVerified: true,
    });

    // Use a generic response so the endpoint does not disclose registered emails.
    const responseMessage =
      "If an active account exists with that email, a password reset link will be sent.";

    if (!user) {
      return res.status(200).json({
        message: responseMessage,
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashToken(rawToken);

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const resetLink =
      `${frontendURL()}/cms/reset-password?token=${rawToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "FISDEV CMS Password Reset",
        text: `
Hello ${user.name},

A password reset was requested for your FISDEV CMS account.

Use the link below to reset your password:

${resetLink}

This link expires in 15 minutes.

If you did not request this, you can ignore this email.
        `,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Password Reset</h2>
            <p>Hello ${user.name},</p>
            <p>A password reset was requested for your FISDEV CMS account.</p>
            <p>
              <a href="${resetLink}"
                 style="display:inline-block;padding:12px 22px;background:#056699;color:white;text-decoration:none;border-radius:5px;">
                Reset Password
              </a>
            </p>
            <p>This link expires in 15 minutes.</p>
            <p>If you did not request this, you can ignore this email.</p>
          </div>
        `,
      });
    } catch (emailError) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      console.error("Password reset email error:", emailError);

      return res.status(500).json({
        message: "Unable to send the password reset email. Please try again.",
      });
    }

    return res.status(200).json({
      message: responseMessage,
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: "Unable to process your request.",
    });
  }
};

// @desc    Reset password using email token
// @route   POST /api/auth/reset-password
// @access  Public, requires a valid reset token
export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Token, password and confirmation are required.",
      });
    }

    if (!validPassword(password)) {
      return res.status(400).json({
        message: "Your password must contain at least 12 characters.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    const hashedToken = hashToken(token);

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
      isActive: true,
    }).select("+passwordResetToken +passwordResetExpires");

    if (!user) {
      return res.status(400).json({
        message: "This password reset link is invalid or has expired.",
      });
    }

    user.password = password;
    user.passwordChangedAt = new Date();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Unable to reset your password. Please try again.",
    });
  }
};

// @desc    Get currently authenticated user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      user: publicUser(req.user),
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Unable to retrieve your account details.",
    });
  }
};