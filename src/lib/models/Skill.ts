import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  order: number;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Programming Languages',
        'Web Technologies',
        'Databases & Tools',
        'Concepts & Frameworks',
      ],
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
