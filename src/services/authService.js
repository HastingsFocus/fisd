
import api from "./api";

// Login.
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Accept an administrator's invitation and create a password.
export const acceptInvitation = async (invitationData) => {
  const response = await api.post(
    "/auth/accept-invitation",
    invitationData
  );

  return response.data;
};

// Request password reset.
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

// Reset password.
export const resetPassword = async (resetData) => {
  const response = await api.post("/auth/reset-password", resetData);
  return response.data;
};

// Get authenticated user.
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
