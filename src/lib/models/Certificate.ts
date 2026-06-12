import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  organization: string;
  year: string;
  credentialId?: string;
  imageKey?: string; // Optional key to associate with public assets
  description?: string; // Detailed description of the certificate course
  image?: string; // Base64 string representing uploaded certificate image
  status?: string; // Finished, Continue, Hold, Stop
  attachment?: string; // Base64 string of uploaded PDF or image
  attachmentType?: string; // 'image' or 'pdf'
  attachmentName?: string; // Original file name
}

const CertificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    credentialId: { type: String, trim: true },
    imageKey: { type: String, trim: true },
    description: { type: String },
    image: { type: String },
    status: {
      type: String,
      enum: ['Finished', 'Continue', 'Hold', 'Stop'],
      default: 'Finished'
    },
    attachment: { type: String },
    attachmentType: { type: String },
    attachmentName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
