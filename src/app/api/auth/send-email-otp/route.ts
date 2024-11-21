// src/app/api/auth/send-email-otp/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import EmailOTP from '../../../models/EmailOTP';
import { sendEmail } from '../../../utils/sendEmail';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Email is required.' },
      { status: 400 }
    );
  }

  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Connect to the database
    await dbConnect();

    // Save OTP to the database
    await EmailOTP.findOneAndUpdate(
      { email },
      {
        email,
        otp,
        createdAt: new Date(),
      },
      { upsert: true, new: true }
    );

    // Send OTP via email
    const emailHtml = `
      <h1>Your OTP Code</h1>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Your OTP Code',
      html: emailHtml,
    });

    return NextResponse.json(
      { success: true, message: 'OTP sent successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email OTP:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}
