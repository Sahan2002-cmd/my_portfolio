import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  date: string;
  techStack: string[];
  link?: string;
  github?: string;
  order: number;
  attachment?: string;
  attachmentType?: string;
  attachmentName?: string;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    techStack: { type: [String], required: true },
    link: { type: String, trim: true },
    github: { type: String, trim: true },
    order: { type: Number, default: 0 },
    attachment: { type: String },
    attachmentType: { type: String },
    attachmentName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
