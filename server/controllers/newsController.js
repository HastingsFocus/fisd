import mongoose from "mongoose";
import News from "../models/News.js";
import { cloudinary } from "../config/cloudinary.js";

const getUserId = (req) => req.user?._id || req.user?.id;

const populateStaff = (query) =>
  query.populate("createdBy", "name email role")
    .populate("updatedBy", "name email role");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Escape special characters before using search text in a regular expression.
const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// CREATE NEWS
export const createNews = async (req, res) => {
  try {
    const { title, date, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "News title and content are required.",
      });
    }

    const news = await News.create({
      title: title.trim(),
      date: date || new Date(),
      content: content.trim(),
      coverImage: req.file?.path || "",
      imagePublicId: req.file?.filename || "",
      status: "draft",
      createdBy: getUserId(req),
      updatedBy: getUserId(req),
    });

    return res.status(201).json({
      success: true,
      message: "News article created successfully.",
      data: news,
    });
  } catch (error) {
    if (req.file?.filename) {
      await cloudinary.uploader.destroy(req.file.filename).catch(() => {});
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create news article.",
      error: error.message,
    });
  }
};

// GET ALL CMS NEWS
export const getNews = async (req, res) => {
  try {
    const {
      status,
      search = "",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const filter = {};

    if (["draft", "published", "archived"].includes(status)) {
      filter.status = status;
    }

    if (search.trim()) {
      const searchRegex = new RegExp(escapeRegex(search.trim()), "i");

      filter.$or = [
        { title: searchRegex },
        { content: searchRegex },
      ];
    }

    const [news, total] = await Promise.all([
      populateStaff(
        News.find(filter)
          .sort({ date: -1, createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage)
      ),
      News.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: news,
      pagination: {
        total,
        page: currentPage,
        limit: perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve news articles.",
      error: error.message,
    });
  }
};

// GET ONE NEWS ARTICLE FOR CMS
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await populateStaff(News.findById(id));

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve news article.",
      error: error.message,
    });
  }
};

// UPDATE NEWS
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, content } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    if (title !== undefined) news.title = title.trim();
    if (date !== undefined) news.date = date;
    if (content !== undefined) news.content = content.trim();

    const oldImagePublicId = news.imagePublicId;

    if (req.file) {
      news.coverImage = req.file.path;
      news.imagePublicId = req.file.filename;
    }

    news.updatedBy = getUserId(req);

    await news.save();

    // Delete the previous Cloudinary image only after the update succeeds.
    if (
      req.file &&
      oldImagePublicId &&
      oldImagePublicId !== req.file.filename
    ) {
      await cloudinary.uploader.destroy(oldImagePublicId).catch((error) => {
        console.error("Old news image cleanup failed:", error.message);
      });
    }

    return res.status(200).json({
      success: true,
      message: "News article updated successfully.",
      data: news,
    });
  } catch (error) {
    if (req.file?.filename) {
      await cloudinary.uploader.destroy(req.file.filename).catch(() => {});
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update news article.",
      error: error.message,
    });
  }
};

// PUBLISH NEWS
export const publishNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    if (!news.title || !news.content || !news.coverImage) {
      return res.status(400).json({
        success: false,
        message: "A title, content and cover image are required before publishing.",
      });
    }

    news.status = "published";
    news.publishedAt = new Date();
    news.archivedAt = null;
    news.updatedBy = getUserId(req);

    await news.save();

    return res.status(200).json({
      success: true,
      message: "News article published successfully.",
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to publish news article.",
      error: error.message,
    });
  }
};

// ARCHIVE NEWS
export const archiveNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    news.status = "archived";
    news.archivedAt = new Date();
    news.updatedBy = getUserId(req);

    await news.save();

    return res.status(200).json({
      success: true,
      message: "News article archived successfully.",
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to archive news article.",
      error: error.message,
    });
  }
};

// GET PUBLISHED NEWS FOR PUBLIC WEBSITE
export const getPublishedNews = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 9,
    } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.min(Math.max(Number(limit) || 9, 1), 100);

    const filter = {
      status: "published",
    };

    if (search.trim()) {
      const searchRegex = new RegExp(escapeRegex(search.trim()), "i");

      filter.$or = [
        { title: searchRegex },
        { content: searchRegex },
      ];
    }

    const [news, total] = await Promise.all([
      News.find(filter)
        .select("-imagePublicId -createdBy -updatedBy")
        .sort({ date: -1, publishedAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage),
      News.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: news,
      pagination: {
        total,
        page: currentPage,
        limit: perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve published news.",
      error: error.message,
    });
  }
};

// GET ONE PUBLISHED NEWS ARTICLE FOR PUBLIC WEBSITE
export const getPublishedNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findOne({
      _id: id,
      status: "published",
    }).select("-imagePublicId -createdBy -updatedBy");

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "Published news article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve news article.",
      error: error.message,
    });
  }
};