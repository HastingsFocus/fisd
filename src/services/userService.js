
import api from "./api";

// Invite a new CMS user.
export const inviteUser = async (userData) => {
  const response = await api.post("/users/invite", userData);
  return response.data;
};

// Get all CMS users.
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Activate or deactivate a user.
export const updateUserStatus = async (userId, isActive) => {
  const response = await api.patch(
    `/users/${userId}/status`,
    { isActive }
  );

  return response.data;
};
