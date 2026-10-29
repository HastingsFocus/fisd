
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/email.js";

const frontendURL = () =>
  (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const createToken = (user) =>
  jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  emailVerified: user.emailVerified,
});

const validEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validPassword = (password) =>
  typeof password === "string" && password.length >= 12;

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({
      message: "Please complete all registration fields.",
    });
  }

  if (!validEmail(email.trim())) {
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  }

  if (name.trim().length > 100) {
    return res.status(400).json({
      message: "Name cannot exceed 100 characters.",
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

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return res.status(409).json({
      message: "An account with this email may already exist. Try logging in or resetting your password.",
    });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "editor",
    emailVerified: false,
    emailVerificationToken: hashToken(rawToken),
    emailVerificationExpires: Date.now() + 30 * 60 * 1000,
  });

 const verificationURL =
  `${frontendURL()}/cms/verify-email?token=${rawToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Verify your FISDEV CMS account",
      text: `Hello ${user.name},\n\nVerify your email using this link:\n${verificationURL}\n\nThis link expires in 30 minutes.`,
      html: `
        <p>Hello ${user.name},</p>
        <p>Thanks for registering for the FISDEV CMS.</p>
        <p><a href="${verificationURL}">Verify your email address</a></p>
        <p>This link expires in 30 minutes. If you did not register, ignore this email.</p>
      `,
    });
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw error;
  }

  res.status(201).json({
    message: "Account created. Check your email for the verification link.",
  });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token || typeof token !== "string") {
    return res.status(400).json({
      message: "A verification token is required.",
    });
  }

  const user = await User.findOne({
    emailVerificationToken: hashToken(token),
    emailVerificationExpires: { $gt: Date.now() },
  }).select("+emailVerificationToken +emailVerificationExpires");

  if (!user) {
    return res.status(400).json({
      message: "This verification link is invalid or expired. Please register again or request a new link.",
    });
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  res.json({
    message: "Email verified successfully. You can now log in.",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      message: "Please enter your email and password.",
    });
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      message: "This account has been disabled. Contact your administrator.",
    });
  }

  if (!user.emailVerified) {
    return res.status(403).json({
      message: "Please verify your email before logging in.",
    });
  }

  res.json({
    message: "Login successful.",
    token: createToken(user),
    user: publicUser(user),
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (typeof email !== "string" || !validEmail(email.trim())) {
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  }

  const genericMessage =
    "If an eligible account exists for that email, a password-reset link will be sent shortly.";

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
    isActive: true,
    emailVerified: true,
  });

  if (!user) {
    return res.json({ message: genericMessage });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = hashToken(rawToken);
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

 const resetURL =
  `${frontendURL()}/cms/reset-password?token=${rawToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Reset your FISDEV CMS password",
      text: `Hello ${user.name},\n\nReset your password here:\n${resetURL}\n\nThis link expires in 15 minutes. If you did not request this, ignore this email.`,
      html: `
        <p>Hello ${user.name},</p>
        <p>We received a request to reset your FISDEV CMS password.</p>
        <p><a href="${resetURL}">Reset your password</a></p>
        <p>This link expires in 15 minutes. If you did not request a reset, ignore this email.</p>
      `,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw error;
  }

  res.json({ message: genericMessage });
};

export const resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  if (!token || typeof token !== "string") {
    return res.status(400).json({
      message: "A valid reset token is required.",
    });
  }

  if (!validPassword(password)) {
    return res.status(400).json({
      message: "Your new password must contain at least 12 characters.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match.",
    });
  }

  const user = await User.findOne({
    passwordResetToken: hashToken(token),
    passwordResetExpires: { $gt: Date.now() },
    isActive: true,
  }).select("+passwordResetToken +passwordResetExpires");

  if (!user) {
    return res.status(400).json({
      message: "This reset link is invalid or expired. Please request another one.",
    });
  }

  user.password = password;
  user.passwordChangedAt = new Date();
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.json({
    message: "Password reset successfully. Please log in with your new password.",
  });
};

export const getMe = async (req, res) => {
  res.json({ user: publicUser(req.user) });
};
