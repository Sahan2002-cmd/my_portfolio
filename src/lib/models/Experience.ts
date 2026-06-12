import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  description?: string;
  type: 'work' | 'education';
  order: number;
  attachment?: string;
  attachmentType?: string;
  attachmentName?: string;
}

const ExperienceSchema: Schema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true, enum: ['work', 'education'] },
    order: { type: Number, default: 0 },
    attachment: { type: String },
    attachmentType: { type: String },
    attachmentName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
