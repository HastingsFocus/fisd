
import "dotenv/config";

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  // Check required environment variables.
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      "Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first."
    );
  }

  // Match the User schema password requirement.
  if (ADMIN_PASSWORD.length < 8) {
    throw new Error(
      "ADMIN_PASSWORD must contain at least 8 characters."
    );
  }

  await connectDB();

  const email = ADMIN_EMAIL.trim().toLowerCase();

  // Never accidentally create another administrator.
  const existingAdmin = await User.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log(
      `An administrator already exists (${existingAdmin.email}). No account created.`
    );
    return;
  }

  // Prevent duplicate email addresses.
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error(
      "That email already belongs to another account. Use a different admin email."
    );
  }

  // Create the initial administrator.
  const admin = await User.create({
    name: ADMIN_NAME.trim(),
    email,
    password: ADMIN_PASSWORD,
    role: "admin",
    emailVerified: true,
    isActive: true,
  });

  console.log("--------------------------------------");
  console.log("INITIAL ADMINISTRATOR CREATED");
  console.log("--------------------------------------");
  console.log(`Name: ${admin.name}`);
  console.log(`Email: ${admin.email}`);
  console.log(`Role: ${admin.role}`);
  console.log(`Active: ${admin.isActive}`);
  console.log("--------------------------------------");
};

try {
  await seedAdmin();
} catch (error) {
  console.error("Admin setup failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
