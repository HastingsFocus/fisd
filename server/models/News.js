import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "News title is required."],
      trim: true,
      maxlength: 200,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    content: {
      type: String,
      required: [true, "News content is required."],
      trim: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    imagePublicId: {
      type: String,
      default: "",
    },

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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ status: 1, date: -1 });
newsSchema.index({ title: "text", content: "text" });

const News = mongoose.model("News", newsSchema);

export default News;