
import api from "./api";

// Create a news article with an optional cover image.
export const createNews = async (newsData) => {
  const formData = new FormData();

  formData.append("title", newsData.title);
  formData.append("date", newsData.date);
  formData.append("content", newsData.content);

  if (newsData.coverImage) {
    formData.append("coverImage", newsData.coverImage);
  }

  const response = await api.post("/news", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get all CMS news with optional filters.
export const getNews = async (params = {}) => {
  const response = await api.get("/news", { params });
  return response.data;
};

// Get a single news article.
export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};

// Update a news article.
export const updateNews = async (id, newsData) => {
  const formData = new FormData();

  if (newsData.title !== undefined) {
    formData.append("title", newsData.title);
  }

  if (newsData.date !== undefined) {
    formData.append("date", newsData.date);
  }

  if (newsData.content !== undefined) {
    formData.append("content", newsData.content);
  }

  if (newsData.coverImage) {
    formData.append("coverImage", newsData.coverImage);
  }

  const response = await api.put(`/news/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Publish a news article.
export const publishNews = async (id) => {
  const response = await api.patch(`/news/${id}/publish`);
  return response.data;
};

// Archive a news article.
export const archiveNews = async (id) => {
  const response = await api.patch(`/news/${id}/archive`);
  return response.data;
};

// Get published news for the public website.
export const getPublishedNews = async (params = {}) => {
  const response = await api.get("/news/public", { params });
  return response.data;
};

// Get one published news article.
export const getPublishedNewsById = async (id) => {
  const response = await api.get(`/news/public/${id}`);
  return response.data;
};
