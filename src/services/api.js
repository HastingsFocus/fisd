
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://fisd.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach authentication token to requests.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fisdev_cms_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Allow Axios to set the multipart boundary for file uploads.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired or invalid authentication sessions.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("fisdev_cms_token");
      localStorage.removeItem("fisdev_cms_user");

      if (window.location.pathname.startsWith("/cms/dashboard")) {
        window.location.href = "/cms/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
