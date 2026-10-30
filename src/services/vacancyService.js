
import api from "./api";

// Create a new vacancy (saved as draft)
export const createVacancy = async (vacancyData) => {
  const response = await api.post("/vacancies", vacancyData);
  return response.data;
};

// Get all vacancies for the CMS
export const getVacancies = async (params = {}) => {
  const response = await api.get("/vacancies", { params });
  return response.data;
};

// Get one vacancy by ID (CMS)
export const getVacancyById = async (id) => {
  const response = await api.get(`/vacancies/${id}`);
  return response.data;
};

// Update an existing vacancy
export const updateVacancy = async (id, vacancyData) => {
  const response = await api.put(`/vacancies/${id}`, vacancyData);
  return response.data;
};

// Publish a vacancy (admin only)
export const publishVacancy = async (id) => {
  const response = await api.patch(`/vacancies/${id}/publish`);
  return response.data;
};

// Archive a vacancy (admin only)
export const archiveVacancy = async (id) => {
  const response = await api.patch(`/vacancies/${id}/archive`);
  return response.data;
};

// Get published vacancies for the public website
export const getPublishedVacancies = async (params = {}) => {
  const response = await api.get("/vacancies/public", { params });
  return response.data;
};

// Get one published vacancy for the public website
export const getPublishedVacancyById = async (id) => {
  const response = await api.get(`/vacancies/public/${id}`);
  return response.data;
};
