
import mongoose from "mongoose";
import Vacancy from "../models/Vacancy.js";

// Fields that CMS staff are allowed to create or edit.
const editableFields = [
  "title",
  "organisationalUnit",
  "reportingTo",
  "closingDate",
  "introduction",
  "overallObjective",
  "mainResponsibilities",
  "educationAndExperience",
  "attributesAndCompetencies",
  "additionalInformation",
  "howToApply",
];

// Get the authenticated user's MongoDB ID.
const getUserId = (req) => req.user?._id || req.user?.id;

// Return only permitted fields from the request body.
const getEditableData = (body) => {
  const data = {};

  editableFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      data[field] = body[field];
    }
  });

  return data;
};

// Validate MongoDB document IDs.
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Populate staff information for CMS responses.
const populateStaff = (query) =>
  query.populate("createdBy", "name email role")
    .populate("updatedBy", "name email role");

// Validate required information before publishing.
const validateForPublishing = (vacancy) => {
  const errors = [];

  if (!vacancy.title?.trim()) {
    errors.push("Vacancy title is required.");
  }

  if (!vacancy.closingDate) {
    errors.push("Closing date is required.");
  } else {
    const closingDate = new Date(vacancy.closingDate);
    const today = new Date();

    // Compare calendar dates, not the exact time.
    const closingDay = Date.UTC(
      closingDate.getUTCFullYear(),
      closingDate.getUTCMonth(),
      closingDate.getUTCDate()
    );

    const todayDay = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );

    if (Number.isNaN(closingDate.getTime())) {
      errors.push("A valid closing date is required.");
    } else if (closingDay < todayDay) {
      errors.push("The closing date cannot be in the past.");
    }
  }

  if (!vacancy.introduction?.trim()) {
    errors.push("The organisation introduction is required.");
  }

  if (!vacancy.overallObjective?.trim()) {
    errors.push("The overall objective is required.");
  }

  if (
    !Array.isArray(vacancy.mainResponsibilities) ||
    vacancy.mainResponsibilities.length === 0 ||
    vacancy.mainResponsibilities.some(
      (item) => typeof item !== "string" || !item.trim()
    )
  ) {
    errors.push("At least one valid main responsibility is required.");
  }

  if (!vacancy.educationAndExperience?.trim()) {
    errors.push("Education and experience details are required.");
  }

  if (
    !Array.isArray(vacancy.attributesAndCompetencies) ||
    vacancy.attributesAndCompetencies.length === 0 ||
    vacancy.attributesAndCompetencies.some(
      (item) => typeof item !== "string" || !item.trim()
    )
  ) {
    errors.push("At least one valid attribute or competency is required.");
  }

  if (!vacancy.howToApply?.instructions?.trim()) {
    errors.push("How to Apply instructions are required.");
  }

  return errors;
};

// Standard error response.
const handleError = (res, error, message) => {
  console.error(message, error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Please check the vacancy information.",
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A vacancy with this information already exists.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong while processing the vacancy.",
  });
};

// ======================================================
// 1. CREATE VACANCY - Save as draft
// ======================================================

export const createVacancy = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const vacancyData = getEditableData(req.body);

    const vacancy = await Vacancy.create({
      ...vacancyData,
      status: "draft",
      createdBy: userId,
      updatedBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Vacancy saved as draft successfully.",
      vacancy,
    });
  } catch (error) {
    return handleError(res, error, "Create vacancy error:");
  }
};

// ======================================================
// 2. GET ALL VACANCIES - CMS
// Includes drafts, published and archived vacancies.
// Supports search, status filter and pagination.
// ======================================================

export const getVacancies = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      100
    );

    const skip = (page - 1) * limit;

    const { status, search } = req.query;

    const filter = {};

    if (status) {
      const allowedStatuses = ["draft", "published", "archived"];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid vacancy status.",
        });
      }

      filter.status = status;
    }

    if (search?.trim()) {
      const searchRegex = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { title: searchRegex },
        { organisationalUnit: searchRegex },
        { reportingTo: searchRegex },
      ];
    }

    const [vacancies, total] = await Promise.all([
      populateStaff(
        Vacancy.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
      ),

      Vacancy.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: vacancies.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      vacancies,
    });
  } catch (error) {
    return handleError(res, error, "Get vacancies error:");
  }
};

// ======================================================
// 3. GET SINGLE VACANCY - CMS
// ======================================================

export const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vacancy ID.",
      });
    }

    const vacancy = await populateStaff(
      Vacancy.findById(id)
    );

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found.",
      });
    }

    return res.status(200).json({
      success: true,
      vacancy,
    });
  } catch (error) {
    return handleError(res, error, "Get vacancy error:");
  }
};

// ======================================================
// 4. UPDATE VACANCY
// Does not allow changing status directly.
// ======================================================

export const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vacancy ID.",
      });
    }

    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found.",
      });
    }

    const updates = getEditableData(req.body);

    Object.assign(vacancy, updates);
    vacancy.updatedBy = userId;

    await vacancy.save();

    return res.status(200).json({
      success: true,
      message: "Vacancy updated successfully.",
      vacancy,
    });
  } catch (error) {
    return handleError(res, error, "Update vacancy error:");
  }
};

// ======================================================
// 5. PUBLISH VACANCY
// Validates all required information before publishing.
// ======================================================

export const publishVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vacancy ID.",
      });
    }

    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found.",
      });
    }

    const errors = validateForPublishing(vacancy);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "This vacancy cannot be published yet.",
        errors,
      });
    }

    vacancy.status = "published";
    vacancy.publishedAt = new Date();
    vacancy.archivedAt = null;
    vacancy.updatedBy = userId;

    await vacancy.save();

    return res.status(200).json({
      success: true,
      message: "Vacancy published successfully.",
      vacancy,
    });
  } catch (error) {
    return handleError(res, error, "Publish vacancy error:");
  }
};

// ======================================================
// 6. ARCHIVE VACANCY
// Removes it from public listings but keeps the record.
// ======================================================

export const archiveVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vacancy ID.",
      });
    }

    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Vacancy not found.",
      });
    }

    if (vacancy.status === "archived") {
      return res.status(200).json({
        success: true,
        message: "This vacancy is already archived.",
        vacancy,
      });
    }

    vacancy.status = "archived";
    vacancy.archivedAt = new Date();
    vacancy.updatedBy = userId;

    await vacancy.save();

    return res.status(200).json({
      success: true,
      message: "Vacancy archived successfully.",
      vacancy,
    });
  } catch (error) {
    return handleError(res, error, "Archive vacancy error:");
  }
};

// ======================================================
// 7. GET PUBLISHED VACANCIES - PUBLIC
// Only published vacancies are returned.
// ======================================================

export const getPublishedVacancies = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      100
    );

    const skip = (page - 1) * limit;

    const filter = {
      status: "published",
    };

    if (req.query.search?.trim()) {
      const searchRegex = new RegExp(
        req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { title: searchRegex },
        { organisationalUnit: searchRegex },
        { introduction: searchRegex },
      ];
    }

    const [vacancies, total] = await Promise.all([
      Vacancy.find(filter)
        .select("-createdBy -updatedBy -__v")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),

      Vacancy.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: vacancies.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      vacancies,
    });
  } catch (error) {
    return handleError(res, error, "Get published vacancies error:");
  }
};

// ======================================================
// 8. GET SINGLE PUBLISHED VACANCY - PUBLIC
// Drafts and archived vacancies are never exposed.
// ======================================================

export const getPublishedVacancyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vacancy ID.",
      });
    }

    const vacancy = await Vacancy.findOne({
      _id: id,
      status: "published",
    }).select("-createdBy -updatedBy -__v");

    if (!vacancy) {
      return res.status(404).json({
        success: false,
        message: "Published vacancy not found.",
      });
    }

    return res.status(200).json({
      success: true,
      vacancy,
    });
  } catch (error) {
    return handleError(res, error, "Get published vacancy error:");
  }
};
