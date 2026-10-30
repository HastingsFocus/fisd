import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    password: {
      type: String,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "editor",
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    // Invitation details
    invitationToken: {
      type: String,
      select: false,
    },

    invitationExpires: {
      type: Date,
      select: false,
    },

    invitationAcceptedAt: {
      type: Date,
    },

    // Retained for compatibility with the existing email verification flow
    emailVerificationToken: {
      type: String,
      select: false,
    },

    emailVerificationExpires: {
      type: Date,
      select: false,
    },

    // Password reset details
    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },

    passwordChangedAt: Date,

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;