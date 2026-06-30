import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  images: string[];
  liveLinks: {
    label: string;
    url: string;
  }[];
  sourceCodes: {
    label: string;
    url: string;
  }[];
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Please provide a project description"],
    },

    images: {
      type: [String],
      default: [],
      required: [true, "Please upload at least one image"],
    },

    liveLinks: {
      type: [LinkSchema],
      default: [],
    },

    sourceCodes: {
      type: [LinkSchema],
      default: [],
    },

    technologies: {
      type: [String],
      required: [true, "Please provide at least one technology"],
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
