// src/app/models/EmailOTP.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const EmailOTPSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      expires: 600, // Document will be automatically deleted after 600 seconds (10 minutes)
    },
  },
  {
    timestamps: false,
    collection: 'emailotps',
  }
);

export default mongoose.models.EmailOTP ||
  mongoose.model<IEmailOTP>('EmailOTP', EmailOTPSchema);
