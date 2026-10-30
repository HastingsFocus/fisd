import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/email.js";

const frontendURL = () =>
  (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, "");

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  emailVerified: user.emailVerified,
  invitationAcceptedAt: user.invitationAcceptedAt,
  createdAt: user.createdAt,
});

// @desc    Invite a new CMS user
// @route   POST /api/users/invite
// @access  Admin
export const inviteUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        message: "Name and email are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!validEmail) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    if (!["admin", "editor"].includes(role)) {
      return res.status(400).json({
        message: "Please select a valid user role.",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with this email address already exists.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashToken(rawToken);

    const invitationExpiry = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      role,
      isActive: false,
      emailVerified: false,
      invitationToken: hashedToken,
      invitationExpires: invitationExpiry,
      invitedBy: req.user._id,
    });

    const invitationLink =
      `${frontendURL()}/cms/accept-invitation?token=${rawToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "You've been invited to FISDEV CMS",
        text: `
Hello ${user.name},

You have been invited to join the FISDEV Content Management System.

Your assigned role is: ${user.role}

Use the link below to accept your invitation and create your password:

${invitationLink}

This invitation expires in 24 hours.

If you were not expecting this invitation, you can ignore this email.
        `,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Welcome to FISDEV CMS</h2>

            <p>Hello ${user.name},</p>

            <p>
              You have been invited to join the FISDEV Content Management System.
            </p>

            <p>
              <strong>Assigned role:</strong> ${user.role}
            </p>

            <p>
              Click the button below to accept your invitation and create your password.
            </p>

            <p>
              <a
                href="${invitationLink}"
                style="
                  display: inline-block;
                  padding: 12px 22px;
                  background-color: #056699;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                "
              >
                Accept Invitation
              </a>
            </p>

            <p>This invitation expires in 24 hours.</p>

            <p>
              If you were not expecting this invitation, you can ignore this email.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      await User.findByIdAndDelete(user._id);

      console.error("Invitation email error:", emailError);

      return res.status(500).json({
        message: "The invitation email could not be sent. Please try again.",
      });
    }

    return res.status(201).json({
      message: `Invitation sent successfully to ${user.email}.`,
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Invite user error:", error);

    return res.status(500).json({
      message: "Something went wrong while inviting the user.",
    });
  }
};

// @desc    Get all CMS users
// @route   GET /api/users
// @access  Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "name email role isActive emailVerified invitationAcceptedAt createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      message: "Unable to retrieve users.",
    });
  }
};

// @desc    Activate or deactivate a CMS user
// @route   PATCH /api/users/:id/status
// @access  Admin
export const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    const { id } = req.params;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "A valid account status is required.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Prevent an administrator from deactivating their own account.
    if (user._id.toString() === req.user._id.toString() && !isActive) {
      return res.status(400).json({
        message: "You cannot deactivate your own account.",
      });
    }

    // Do not allow the last active administrator to be deactivated.
    if (user.role === "admin" && user.isActive && !isActive) {
      const activeAdminCount = await User.countDocuments({
        role: "admin",
        isActive: true,
      });

      if (activeAdminCount <= 1) {
        return res.status(400).json({
          message: "You cannot deactivate the last active administrator.",
        });
      }
    }

    user.isActive = isActive;
    await user.save();

    return res.status(200).json({
      message: `User ${isActive ? "activated" : "deactivated"} successfully.`,
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Update user status error:", error);

    return res.status(500).json({
      message: "Unable to update the user's account status.",
    });
  }
};