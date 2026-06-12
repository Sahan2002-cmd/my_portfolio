import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
