// src/app/models/User.ts

import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  role: 'student' | 'professional' | 'delivery' | 'admin';
  userType: 'student' | 'professional';
  firstName: string;
  lastName: string;
  whereStudy: 'hostel' | 'pg' | 'other';
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  password: string;
  phoneNumber: string;
  emailVerified: boolean;
  // Student-specific fields
  institutionType?: 'college' | 'school' | 'coaching';
  courseName?: string;
  courseLevel?: 'bachelor' | 'master' | 'phd';
  classLevel?: string;
  preparationType?: string;
  institutionName?: string;
  institutionOther?: string;
  // Professional-specific fields
  companyName?: string;
  jobTitle?: string;
  // Common fields
  roomNumber?: string;
  address: {
    address: string;
    hostelName?: string;
    buildingName?: string;
    additionalDeliveryInfo: string;
    city: string;
    postalCode: string;
    coordinates: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['student', 'professional', 'delivery', 'admin'],
      required: true,
      default: 'student',
    },
    userType: {
      type: String,
      enum: ['student', 'professional'],
      required: true,
    },
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
      trim: true,
    },
    whereStudy: {
      type: String,
      enum: ['hostel', 'pg', 'other'],
      required: [true, 'Please select where you are living.'],
    },
    age: {
      type: Number,
      required: [true, 'Please provide your age'],
      min: [13, 'You must be at least 13 years old'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Please select your gender'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Exclude from queries by default
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    // Student-specific fields
    institutionType: {
      type: String,
      enum: ['college', 'school', 'coaching'],
      required: function (this: IUser) {
        return this.userType === 'student';
      },
    },
    courseName: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'student' && this.institutionType === 'college';
      },
    },
    courseLevel: {
      type: String,
      enum: ['bachelor', 'master', 'phd'],
      required: function (this: IUser) {
        return this.userType === 'student' && this.institutionType === 'college';
      },
    },
    classLevel: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'student' && this.institutionType === 'school';
      },
    },
    preparationType: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'student' && this.institutionType === 'coaching';
      },
    },
    institutionName: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'student';
      },
    },
    institutionOther: {
      type: String,
      required: function (this: IUser) {
        return (
          this.userType === 'student' &&
          this.institutionName &&
          this.institutionName.toLowerCase() === 'other'
        );
      },
    },
    // Professional-specific fields
    companyName: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'professional';
      },
    },
    jobTitle: {
      type: String,
      required: function (this: IUser) {
        return this.userType === 'professional';
      },
    },
    // Common fields
    roomNumber: {
      type: String,
      required: function (this: IUser) {
        return this.whereStudy === 'hostel' || this.whereStudy === 'pg';
      },
    },
    address: {
      address: { type: String, required: true },
      hostelName: {
        type: String,
        required: function (this: IUser) {
          return this.whereStudy === 'hostel' || this.whereStudy === 'pg';
        },
      },
      buildingName: { type: String }, // Optional
      additionalDeliveryInfo: { type: String, required: true }, // New field
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
          required: true,
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Pre-save middleware to hash passwords
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Compile model if not already compiled
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
