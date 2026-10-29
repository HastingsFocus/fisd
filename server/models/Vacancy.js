
import mongoose from "mongoose";

const howToApplySchema = new mongoose.Schema(
  {
    instructions: {
      type: String,
      trim: true,
      default: "",
    },

    applicationEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    applicationAddress: {
      type: String,
      trim: true,
      default: "",
    },

    onlineApplicationUrl: {
      type: String,
      trim: true,
      default: "",
    },

    requiredDocuments: {
      type: [String],
      default: [],
    },

    additionalNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const vacancySchema = new mongoose.Schema(
  {
    // Basic vacancy information
    title: {
      type: String,
      required: [true, "Vacancy title is required"],
      trim: true,
      maxlength: 200,
    },

    organisationalUnit: {
      type: String,
      trim: true,
      default: "",
    },

    reportingTo: {
      type: String,
      trim: true,
      default: "",
    },

    closingDate: {
      type: Date,
      default: null,
    },

    // Organisation introduction and job description
    introduction: {
      type: String,
      trim: true,
      default: "",
    },

    overallObjective: {
      type: String,
      trim: true,
      default: "",
    },

    mainResponsibilities: {
      type: [String],
      default: [],
    },

    educationAndExperience: {
      type: String,
      trim: true,
      default: "",
    },

    attributesAndCompetencies: {
      type: [String],
      default: [],
    },

    additionalInformation: {
      type: String,
      trim: true,
      default: "",
    },

    // Application instructions
    howToApply: {
      type: howToApplySchema,
      default: () => ({}),
    },

    // Vacancy publishing workflow
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    archivedAt: {
      type: Date,
      default: null,
    },

    // User tracking
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Useful indexes for filtering and searching vacancies
vacancySchema.index({ status: 1, closingDate: 1 });
vacancySchema.index({ title: "text", introduction: "text" });

const Vacancy = mongoose.model("Vacancy", vacancySchema);

export default Vacancy;
