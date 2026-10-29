
import "dotenv/config";

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      "Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first."
    );
  }

  if (ADMIN_PASSWORD.length < 6) {
    throw new Error(
      "ADMIN_PASSWORD must contain at least 6 characters."
    );
  }

  await connectDB();

  // Never create a second initial administrator accidentally.
  const existingAdmin = await User.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log(
      `An administrator already exists (${existingAdmin.email}). No account created.`
    );
    return;
  }

  const email = ADMIN_EMAIL.trim().toLowerCase();

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error(
      "That email already belongs to another account. Use a different admin email."
    );
  }

  const admin = await User.create({
    name: ADMIN_NAME.trim(),
    email,
    password: ADMIN_PASSWORD,
    role: "admin",
    emailVerified: true,
    isActive: true,
  });

  console.log(`Initial administrator created: ${admin.email}`);
};

try {
  await seedAdmin();
} catch (error) {
  console.error("Admin setup failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
