// src/app/api/auth/verify-email-otp/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import EmailOTP from '../../../models/EmailOTP';
import User from '../../../models/User';
export async function POST(request: Request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return NextResponse.json(
      { success: false, message: 'Email and OTP are required.' },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find the OTP entry
    const emailOTP = await EmailOTP.findOne({ email, otp });

    if (!emailOTP) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP.' },
        { status: 400 }
      );
    }

    // Check if OTP is expired (valid for 10 minutes)
    const now = new Date();
    const createdAt = new Date(emailOTP.createdAt);
    const diff = (now.getTime() - createdAt.getTime()) / 1000 / 60; // in minutes

    if (diff > 10) {
      await EmailOTP.deleteOne({ email });
      return NextResponse.json(
        { success: false, message: 'OTP has expired.' },
        { status: 400 }
      );
    }

    // OTP is valid
    // Update user's emailVerified status if user exists
    const user = await User.findOne({ email });
    if (user) {
      user.emailVerified = true;
      await user.save();
    }

    // Delete OTP after verification
    await EmailOTP.deleteOne({ email });

    return NextResponse.json(
      { success: true, message: 'OTP verified successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error verifying email OTP:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}
