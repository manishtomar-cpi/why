// src/app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { isValidPhoneNumber } from 'libphonenumber-js';
import EmailValidator from 'email-validator';
import bcrypt from 'bcrypt'; // For password hashing

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log('Received data:', data); // Debugging: Log incoming data

    // Destructure all necessary fields, including whereStudy
    const {
      firstName,
      lastName,
      age,
      gender,
      userType,
      institutionType,
      courseName,
      courseLevel,
      classLevel,
      preparationType,
      institutionName,
      institutionOther,
      companyName,
      jobTitle,
      email,
      password,
      phoneNumber,
      whereStudy, // **Include whereStudy here**
      roomNumber,
      address, // This is an object
    } = data;

    // Destructure nested address fields
    const {
      address: addrAddress,
      hostelName,
      buildingName,
      additionalDeliveryInfo,
      city,
      postalCode,
      coordinates,
    } = address;

    // Initialize errors object
    const errors: Record<string, string> = {};

    // Basic Validation
    if (!firstName || firstName.trim() === '') {
      errors.firstName = 'Please provide your first name.';
    }

    if (!lastName || lastName.trim() === '') {
      errors.lastName = 'Please provide your last name.';
    }

    if (!age || isNaN(Number(age)) || Number(age) < 13) {
      errors.age = 'You must be at least 13 years old.';
    }

    if (!gender) {
      errors.gender = 'Please select your gender.';
    }

    if (!userType) {
      errors.userType = 'Please select your user type.';
    }

    if (!whereStudy) {
      errors.whereStudy = 'Please select where you are living.';
    }

    // User Type-specific validations
    if (userType === 'student') {
      if (!institutionType) {
        errors.institutionType = 'Please select your institution type.';
      } else {
        if (institutionType === 'college') {
          if (!courseLevel) {
            errors.courseLevel = 'Please select your course level.';
          }
          if (!courseName) {
            errors.courseName = 'Please enter your course name.';
          }
        }

        if (institutionType === 'school') {
          if (!classLevel) {
            errors.classLevel = 'Please select your class.';
          }
        }

        if (institutionType === 'coaching') {
          if (!preparationType) {
            errors.preparationType = 'Please select your preparation type.';
          }
        }

        if (!institutionName) {
          errors.institutionName = 'Please enter your institution name.';
        } else if (institutionName.toLowerCase() === 'other' && !institutionOther) {
          errors.institutionOther = 'Please specify your institution name.';
        }
      }
    }

    if (userType === 'professional') {
      if (!companyName) {
        errors.companyName = 'Please enter your company name.';
      }
      if (!jobTitle) {
        errors.jobTitle = 'Please enter your job title.';
      }
    }

    // Email validation
    if (!email) {
      errors.email = 'Please enter your email address.';
    } else if (!EmailValidator.validate(email)) {
      errors.email = 'Invalid email address.';
    }

    // Password validation
    if (!password || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    // Phone number validation
    if (!phoneNumber) {
      errors.phoneNumber = 'Please enter your phone number.';
    } else if (!isValidPhoneNumber(phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number.';
    }

    // Address validation
    if (!addrAddress) {
      errors.address = 'Please provide your address.';
    } else {
      if (!city) {
        errors.city = 'Please provide your city.';
      }
      if (!postalCode) {
        errors.postalCode = 'Please provide your postal code.';
      }
      if (
        !coordinates ||
        !Array.isArray(coordinates.coordinates) ||
        coordinates.coordinates.length !== 2
      ) {
        errors.coordinates = 'Invalid address coordinates.';
      }

      // If whereStudy is hostel or pg, and hostelName is missing
      if (
        userType === 'student' &&
        (whereStudy === 'hostel' || whereStudy === 'pg') &&
        !hostelName
      ) {
        errors.hostelName = 'Please provide your hostel name.';
      }

      // Additional delivery information validation
      if (!additionalDeliveryInfo) {
        errors.additionalDeliveryInfo = 'Please provide additional delivery information.';
      }
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.', errors },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if email is already registered
    /*
    // Uncomment this block if you want to prevent duplicate emails
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email is already registered.' },
        { status: 400 }
      );
    }
    */

    // Prepare institutionName if 'other'
    let finalInstitutionName = institutionName;
    if (userType === 'student' && institutionName.toLowerCase() === 'other') {
      finalInstitutionName = institutionOther;
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Prepare user data
    const userData: any = {
      firstName,
      lastName,
      age: Number(age),
      gender,
      userType,
      institutionType,
      courseName,
      courseLevel,
      classLevel,
      preparationType,
      institutionName: finalInstitutionName,
      companyName,
      jobTitle,
      email,
      password: hashedPassword, // Store hashed password
      phoneNumber,
      whereStudy, // **Included here**
      roomNumber:
        whereStudy === 'hostel' || whereStudy === 'pg'
          ? roomNumber
          : undefined,
      address: {
        address: addrAddress, // Store the full formatted address
        hostelName:
          whereStudy === 'hostel' || whereStudy === 'pg'
            ? hostelName
            : undefined,
        buildingName: buildingName || '',
        additionalDeliveryInfo: additionalDeliveryInfo,
        city: city,
        postalCode: postalCode,
        coordinates: {
          type: 'Point',
          coordinates: coordinates.coordinates, // [longitude, latitude]
        },
      },
    };

    console.log('User Data to Save:', userData); // Debugging: Log user data before saving

    // Create new user
    const newUser = new User(userData);
    await newUser.save();

    // Optionally, send a welcome email or other post-signup actions

    return NextResponse.json(
      { success: true, message: 'User registered successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}
