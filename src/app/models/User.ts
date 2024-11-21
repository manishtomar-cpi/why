// src/app/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  userType: string;
  institutionType: string;
  courseName?: string;
  courseLevel?: string;
  classLevel?: string;
  preparationType?: string;
  institutionName: string;
  companyName?: string;
  jobTitle?: string;
  email: string;
  password: string;
  phoneNumber: string;
  whereStudy: string; // Ensure this field exists
  roomNumber?: string;
  address: {
    address: string;
    hostelName?: string;
    buildingName?: string;
    additionalDeliveryInfo: string;
    city: string;
    postalCode: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
}

const UserSchema: Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'First name is required.'] },
    lastName: { type: String, required: [true, 'Last name is required.'] },
    age: { type: Number, required: [true, 'Age is required.'], min: 13 },
    gender: { type: String, required: [true, 'Gender is required.'] },
    userType: { type: String, required: [true, 'User type is required.'] },
    institutionType: { type: String, required: [true, 'Institution type is required.'] },
    courseName: { type: String },
    courseLevel: { type: String },
    classLevel: { type: String },
    preparationType: { type: String },
    institutionName: { type: String, required: [true, 'Institution name is required.'] },
    companyName: { type: String },
    jobTitle: { type: String },
    email: { type: String, required: [true, 'Email is required.'], unique: true },
    password: { type: String, required: [true, 'Password is required.'] },
    phoneNumber: { type: String, required: [true, 'Phone number is required.'] },
    whereStudy: { 
      type: String, 
      enum: ['hostel', 'pg', 'home', 'other'], 
      required: [true, 'WhereStudy is required.'] 
    },
    roomNumber: { type: String },
    address: {
      address: { type: String, required: [true, 'Address is required.'] },
      hostelName: { type: String },
      buildingName: { type: String },
      additionalDeliveryInfo: { type: String, required: [true, 'Additional delivery information is required.'] },
      city: { type: String, required: [true, 'City is required.'] },
      postalCode: { type: String, required: [true, 'Postal code is required.'] },
      coordinates: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { 
          type: [Number], 
          required: true,
          validate: {
            validator: function(v: number[]) {
              return v.length === 2;
            },
            message: props => `${props.value} is not a valid coordinate pair!`
          }
        },
      },
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Create a 2dsphere index for geospatial queries if needed
UserSchema.index({ 'address.coordinates': '2dsphere' });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
