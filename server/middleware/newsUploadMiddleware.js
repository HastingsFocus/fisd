import multer from "multer";
import { newsStorage } from "../config/cloudinary.js";

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

const upload = multer({
  storage: newsStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;