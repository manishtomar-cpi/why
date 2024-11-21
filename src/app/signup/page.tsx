// src/app/signup/page.tsx

'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import {
  FaUserPlus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from 'react-icons/fa';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrengthBar from 'react-password-strength-bar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as EmailValidator from 'email-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';

const libraries = ['places'];

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API as string,
    libraries: libraries as any,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    whereStudy: '', // Correct field name
    age: '',
    gender: '',
    userType: '',
    institutionType: '',
    courseName: '',
    courseLevel: '',
    classLevel: '',
    preparationType: '',
    institutionName: '',
    institutionOther: '',
    companyName: '',
    jobTitle: '',
    email: '',
    emailOTP: ['', '', '', '', '', ''], // For 6-digit OTP
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    roomNumber: '',
    address: '',
    hostelName: '',
    buildingName: '',
    additionalDeliveryInfo: '',
    city: '',
    postalCode: '',
    coordinates: [], // [longitude, latitude]
  });

  const [errors, setErrors] = useState<any>({});
  const [addressAutocomplete, setAddressAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [institutionAutocomplete, setInstitutionAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [companyAutocomplete, setCompanyAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [loadingEmailOTP, setLoadingEmailOTP] = useState(false);
  const [emailOTPRequested, setEmailOTPRequested] = useState(false);
  const [emailOTPVerified, setEmailOTPVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);

  const otpRefs = useRef<HTMLInputElement[]>([]);

  // Handle input changes and clear corresponding errors
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;

    // Convert email to lowercase
    if (name === 'email') {
      value = value.toLowerCase();
    }

    setErrors((prev: any) => ({
      ...prev,
      [name]: '',
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle phone number change
  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: '+' + value,
    }));
    setErrors((prev: any) => ({
      ...prev,
      phoneNumber: '',
    }));
  };

  // Handle OTP input change
  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTP = [...formData.emailOTP];
      newOTP[index] = value;
      setFormData((prev) => ({
        ...prev,
        emailOTP: newOTP,
      }));

      // Move focus to next input
      if (value && index < 5) {
        const nextInput = otpRefs.current[index + 1];
        nextInput?.focus();
      }

      // Move focus to previous input on backspace
      if (!value && index > 0) {
        const prevInput = otpRefs.current[index - 1];
        prevInput?.focus();
      }
    }
  };

  // Handle paste event for OTP
  const handleOTPPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const otpArray = pasteData.split('');
      setFormData((prev) => ({
        ...prev,
        emailOTP: otpArray,
      }));
      // Move focus to the last input
      otpRefs.current[5]?.focus();
    }
  };

  // Validate form data
  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    // First Name validation
    if (!formData.firstName || formData.firstName.trim() === '') {
      newErrors.firstName = 'Please provide your first name.';
      valid = false;
    }

    // Last Name validation
    if (!formData.lastName || formData.lastName.trim() === '') {
      newErrors.lastName = 'Please provide your last name.';
      valid = false;
    }

    // Where Study validation
    if (!formData.whereStudy) {
      newErrors.whereStudy = 'Please select where you are studying.';
      valid = false;
    }

    // Age validation
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 13) {
      newErrors.age = 'You must be at least 13 years old.';
      valid = false;
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender.';
      valid = false;
    }

    // User Type validation
    if (!formData.userType) {
      newErrors.userType = 'Please select your user type.';
      valid = false;
    }

    // Student-specific validations
    if (formData.userType === 'student') {
      if (!formData.institutionType) {
        newErrors.institutionType = 'Please select your institution type.';
        valid = false;
      } else {
        if (formData.institutionType === 'college') {
          if (!formData.courseLevel) {
            newErrors.courseLevel = 'Please select your course level.';
            valid = false;
          }
          if (!formData.courseName) {
            newErrors.courseName = 'Please enter your course name.';
            valid = false;
          }
        }

        if (formData.institutionType === 'school') {
          if (!formData.classLevel) {
            newErrors.classLevel = 'Please select your class.';
            valid = false;
          }
        }

        if (formData.institutionType === 'coaching') {
          if (!formData.preparationType) {
            newErrors.preparationType = 'Please select your preparation type.';
            valid = false;
          }
        }

        if (!formData.institutionName) {
          newErrors.institutionName = 'Please enter your institution name.';
          valid = false;
        } else if (
          formData.institutionName.toLowerCase() === 'other' &&
          !formData.institutionOther
        ) {
          newErrors.institutionOther = 'Please specify your institution name.';
          valid = false;
        }
      }
    }

    if (formData.userType === 'professional') {
      if (!formData.companyName) {
        newErrors.companyName = 'Please enter your company name.';
        valid = false;
      }
      if (!formData.jobTitle) {
        newErrors.jobTitle = 'Please enter your job title.';
        valid = false;
      }
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Please enter your email address.';
      valid = false;
    } else if (!EmailValidator.validate(formData.email)) {
      newErrors.email = 'Invalid email address.';
      valid = false;
    }

    // Password validation
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      valid = false;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Please enter your phone number.';
      valid = false;
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number.';
      valid = false;
    }

    // Address validation
    if (!formData.address) {
      newErrors.address = 'Please provide your address.';
      valid = false;
    } else {
      if (!formData.city) {
        newErrors.city = 'Please provide your city.';
        valid = false;
      }
      if (!formData.postalCode) {
        newErrors.postalCode = 'Please provide your postal code.';
        valid = false;
      }
      if (!formData.coordinates || formData.coordinates.length !== 2) {
        newErrors.coordinates = 'Invalid address coordinates.';
        valid = false;
      }

      // If whereStudy is hostel or pg, and hostelName is missing
      if (
        (formData.whereStudy === 'hostel' || formData.whereStudy === 'pg') &&
        !formData.hostelName
      ) {
        newErrors.hostelName = 'Please provide your hostel name.';
        valid = false;
      }

      // Additional delivery information validation
      if (!formData.additionalDeliveryInfo) {
        newErrors.additionalDeliveryInfo = 'Please provide additional delivery information.';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // Address Autocomplete
  const onLoadAddress = (autoC: google.maps.places.Autocomplete) => {
    autoC.setComponentRestrictions({ country: ['in'] });
    autoC.setFields(['address_components', 'geometry', 'formatted_address']);
    autoC.setTypes(['establishment', 'geocode']); // Prioritize establishments and geocodes
    setAddressAutocomplete(autoC);
  };

  const onPlaceChangedAddress = () => {
    if (addressAutocomplete !== null) {
      const place = addressAutocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setFormData((prev) => ({
          ...prev,
          coordinates: [lng, lat],
        }));

        // Extract address components
        const addressComponents = place.address_components;
        let formattedAddress = place.formatted_address || '';
        let buildingName = '';
        let city = '';
        let postalCode = '';

        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes('premise') || types.includes('establishment')) {
            buildingName = component.long_name;
          }
          if (types.includes('locality') || types.includes('administrative_area_level_2')) {
            city = component.long_name;
          }
          if (types.includes('postal_code')) {
            postalCode = component.long_name;
          }
        });

        setFormData((prev) => ({
          ...prev,
          address: formattedAddress, // Store the full formatted address
          buildingName: buildingName || '',
          city: city || '',
          postalCode: postalCode || '',
          hostelName: '', // Reset hostelName
        }));
        setErrors((prev: any) => ({
          ...prev,
          address: '',
          buildingName: '',
          city: '',
          postalCode: '',
          hostelName: '',
        }));
      } else {
        setErrors((prev: any) => ({
          ...prev,
          address: 'Please select a valid address from the suggestions.',
        }));
      }
    } else {
      console.log('Address Autocomplete is not loaded yet!');
    }
  };

  // Institution Autocomplete
  const onLoadInstitution = (autoC: google.maps.places.Autocomplete) => {
    autoC.setComponentRestrictions({ country: ['in'] });
    autoC.setFields(['name']);
    autoC.setTypes(['establishment']); // Prioritize establishments
    setInstitutionAutocomplete(autoC);
  };

  const onPlaceChangedInstitution = () => {
    if (institutionAutocomplete !== null) {
      const place = institutionAutocomplete.getPlace();

      if (place.name) {
        setFormData((prev) => ({
          ...prev,
          institutionName: place.name,
        }));
        setErrors((prev: any) => ({ ...prev, institutionName: '' }));
      } else {
        setErrors((prev: any) => ({
          ...prev,
          institutionName: 'Please select a valid institution from the suggestions.',
        }));
      }
    } else {
      console.log('Institution Autocomplete is not loaded yet!');
    }
  };

  // Company Autocomplete
  const onLoadCompany = (autoC: google.maps.places.Autocomplete) => {
    autoC.setComponentRestrictions({ country: ['in'] });
    autoC.setFields(['name']);
    autoC.setTypes(['establishment']); // Prioritize establishments
    setCompanyAutocomplete(autoC);
  };

  const onPlaceChangedCompany = () => {
    if (companyAutocomplete !== null) {
      const place = companyAutocomplete.getPlace();

      if (place.name) {
        setFormData((prev) => ({
          ...prev,
          companyName: place.name,
        }));
        setErrors((prev: any) => ({ ...prev, companyName: '' }));
      } else {
        setErrors((prev: any) => ({
          ...prev,
          companyName: 'Please select a valid company from the suggestions.',
        }));
      }
    } else {
      console.log('Company Autocomplete is not loaded yet!');
    }
  };

  // Handle email OTP verification
  const handleSendEmailOTP = async () => {
    if (!EmailValidator.validate(formData.email)) {
      setErrors((prev: any) => ({
        ...prev,
        email: 'Please enter a valid email address.',
      }));
      return;
    }
    setLoadingEmailOTP(true);
    setSendingOTP(true);
    try {
      const response = await axios.post('/api/auth/send-email-otp', {
        email: formData.email,
      });
      if (response.data.success) {
        toast.success('An OTP has been sent to your email.', { position: 'top-right' });
        setEmailOTPRequested(true);
      } else {
        toast.error(response.data.message, { position: 'top-right' });
      }
    } catch (error: any) {
      console.error('Error sending email OTP:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        // Display toast for all errors
        Object.values(error.response.data.errors).forEach((errorMsg: string) => {
          toast.error(errorMsg, { position: 'top-right' });
        });
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong.', {
          position: 'top-right',
        });
      }
    } finally {
      setLoadingEmailOTP(false);
      setSendingOTP(false);
    }
  };

  const handleVerifyEmailOTP = async () => {
    const otp = formData.emailOTP.join('');
    if (otp.length !== 6) {
      setErrors((prev: any) => ({
        ...prev,
        emailOTP: 'Please enter the 6-digit OTP sent to your email.',
      }));
      return;
    }
    setVerifyingOTP(true);
    try {
      const response = await axios.post('/api/auth/verify-email-otp', {
        email: formData.email,
        otp: otp,
      });
      if (response.data.success) {
        toast.success('Your email has been successfully verified.', {
          position: 'top-right',
        });
        setEmailOTPVerified(true);
      } else {
        toast.error(response.data.message, { position: 'top-right' });
      }
    } catch (error: any) {
      console.error('Error verifying email OTP:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        // Display toast for all errors
        Object.values(error.response.data.errors).forEach((errorMsg: string) => {
          toast.error(errorMsg, { position: 'top-right' });
        });
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong.', {
          position: 'top-right',
        });
      }
    } finally {
      setVerifyingOTP(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoadingSignup(true);

    // Prepare data
    const userData: any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      whereStudy: formData.whereStudy,
      age: Number(formData.age),
      gender: formData.gender,
      userType: formData.userType,
      institutionType: formData.institutionType,
      courseName: formData.courseName,
      courseLevel: formData.courseLevel,
      classLevel: formData.classLevel,
      preparationType: formData.preparationType,
      institutionName:
        formData.institutionName.toLowerCase() === 'other'
          ? formData.institutionOther
          : formData.institutionName,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      roomNumber:
        formData.whereStudy === 'hostel' || formData.whereStudy === 'pg'
          ? formData.roomNumber
          : undefined,
      address: {
        address: formData.address,
        hostelName:
          formData.whereStudy === 'hostel' || formData.whereStudy === 'pg'
            ? formData.hostelName
            : undefined,
        buildingName: formData.buildingName || '',
        additionalDeliveryInfo: formData.additionalDeliveryInfo,
        city: formData.city,
        postalCode: formData.postalCode,
        coordinates: {
          type: 'Point',
          coordinates: formData.coordinates, // [longitude, latitude]
        },
      },
    };

    try {
      const response = await axios.post('/api/auth/signup', userData);

      if (response.data.success) {
        toast.success('You have successfully registered.', { position: 'top-right' });
        // Redirect after a short delay
        setTimeout(() => {
          router.push('/login'); // Update if you have a different page
        }, 3000);
      } else {
        // Handle errors from API
        if (response.data.errors) {
          setErrors(response.data.errors);
          // Display toast for all errors
          Object.values(response.data.errors).forEach((errorMsg: string) => {
            toast.error(errorMsg, { position: 'top-right' });
          });
        } else {
          toast.error(response.data.message, { position: 'top-right' });
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.response && error.response.data) {
        const { errors, message } = error.response.data;
        if (errors) {
          setErrors(errors);
          // Display toast for all errors
          Object.values(errors).forEach((errorMsg: string) => {
            toast.error(errorMsg, { position: 'top-right' });
          });
        } else {
          toast.error(message || 'Something went wrong.', { position: 'top-right' });
        }
      } else {
        toast.error('Network error. Please try again.', { position: 'top-right' });
      }
    } finally {
      setLoadingSignup(false);
    }
  };

  if (loadError) {
    return <div className="text-red-500">Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4">
        <FaSpinner className="animate-spin text-primary text-6xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic User Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Basic Details</h3>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="First Name"
                className={`mt-1 block w-full border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="mt-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Last Name"
                className={`mt-1 block w-full border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Where Study */}
            <div className="mt-4">
              <label htmlFor="whereStudy" className="block text-sm font-medium text-gray-700">
                Where are you Living?
              </label>
              <select
                name="whereStudy"
                id="whereStudy"
                value={formData.whereStudy}
                onChange={handleInputChange}
                required
                className={`mt-1 block w-full border ${
                  errors.whereStudy ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              >
                <option value="">Select an option</option>
                <option value="hostel">Hostel</option>
                <option value="pg">PG</option>
                <option value="home">Home</option>
                <option value="other">Other</option>
              </select>
              {errors.whereStudy && (
                <p className="text-red-500 text-xs mt-1">{errors.whereStudy}</p>
              )}
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min={13}
                  className={`mt-1 block w-full border ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full border ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>
            </div>
          </div>

          {/* Core User Type */}
          <div>
            <h3 className="text-xl font-semibold mb-4">User Type</h3>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                Are you a Student or a Working Professional?
              </label>
              <select
                name="userType"
                id="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
                className={`mt-1 block w-full border ${
                  errors.userType ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              >
                <option value="">Select User Type</option>
                <option value="student">Student</option>
                <option value="professional">Working Professional</option>
              </select>
              {errors.userType && (
                <p className="text-red-500 text-xs mt-1">{errors.userType}</p>
              )}
            </div>

            {/* Student Details */}
            {formData.userType === 'student' && (
              <div className="mt-4">
                {/* Institution Type */}
                <div>
                  <label
                    htmlFor="institutionType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Institution Type
                  </label>
                  <select
                    name="institutionType"
                    id="institutionType"
                    value={formData.institutionType}
                    onChange={handleInputChange}
                    required
                    className={`mt-1 block w-full border ${
                      errors.institutionType ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                  >
                    <option value="">Select Institution Type</option>
                    <option value="college">College</option>
                    <option value="school">School</option>
                    <option value="coaching">Coaching</option>
                  </select>
                  {errors.institutionType && (
                    <p className="text-red-500 text-xs mt-1">{errors.institutionType}</p>
                  )}
                </div>

                {/* Conditional Fields Based on Institution Type */}
                {formData.institutionType === 'college' && (
                  <>
                    {/* Course Level */}
                    <div className="mt-4">
                      <label
                        htmlFor="courseLevel"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Course Level
                      </label>
                      <select
                        name="courseLevel"
                        id="courseLevel"
                        value={formData.courseLevel}
                        onChange={handleInputChange}
                        required
                        className={`mt-1 block w-full border ${
                          errors.courseLevel ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                      >
                        <option value="">Select Course Level</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                      </select>
                      {errors.courseLevel && (
                        <p className="text-red-500 text-xs mt-1">{errors.courseLevel}</p>
                      )}
                    </div>

                    {/* Course Name */}
                    <div className="mt-4">
                      <label
                        htmlFor="courseName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Course Name
                      </label>
                      <input
                        type="text"
                        name="courseName"
                        id="courseName"
                        value={formData.courseName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Computer Science"
                        className={`mt-1 block w-full border ${
                          errors.courseName ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                      />
                      {errors.courseName && (
                        <p className="text-red-500 text-xs mt-1">{errors.courseName}</p>
                      )}
                    </div>
                  </>
                )}

                {formData.institutionType === 'school' && (
                  <div className="mt-4">
                    {/* Class Level */}
                    <label
                      htmlFor="classLevel"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Class
                    </label>
                    <select
                      name="classLevel"
                      id="classLevel"
                      value={formData.classLevel}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 block w-full border ${
                        errors.classLevel ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                    >
                      <option value="">Select Class</option>
                      {[...Array(12)].map((_, index) => (
                        <option key={index} value={`Class ${index + 1}`}>
                          Class {index + 1}
                        </option>
                      ))}
                    </select>
                    {errors.classLevel && (
                      <p className="text-red-500 text-xs mt-1">{errors.classLevel}</p>
                    )}
                  </div>
                )}

                {formData.institutionType === 'coaching' && (
                  <div className="mt-4">
                    {/* Preparation Type */}
                    <label
                      htmlFor="preparationType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preparation For
                    </label>
                    <select
                      name="preparationType"
                      id="preparationType"
                      value={formData.preparationType}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 block w-full border ${
                        errors.preparationType ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                    >
                      <option value="">Select Preparation Type</option>
                      <option value="engineering">Engineering Entrance Exams</option>
                      <option value="medical">Medical Entrance Exams</option>
                      <option value="civil_services">Civil Services</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.preparationType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.preparationType}
                      </p>
                    )}
                  </div>
                )}

                {/* Institution Name */}
                <div className="mt-4">
                  <label
                    htmlFor="institutionName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Institution Name
                  </label>
                  <Autocomplete
                    onLoad={onLoadInstitution}
                    onPlaceChanged={onPlaceChangedInstitution}
                    options={{
                      types: ['establishment'],
                      componentRestrictions: { country: 'in' },
                    }}
                  >
                    <input
                      type="text"
                      name="institutionName"
                      id="institutionName"
                      value={formData.institutionName}
                      onChange={handleInputChange}
                      required
                      placeholder="Search your institution"
                      className={`mt-1 block w-full border ${
                        errors.institutionName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                    />
                  </Autocomplete>
                  {errors.institutionName && (
                    <p className="text-red-500 text-xs mt-1">{errors.institutionName}</p>
                  )}
                </div>

                {/* If 'Other' is selected */}
                {formData.institutionName.toLowerCase() === 'other' && (
                  <div className="mt-4">
                    <label
                      htmlFor="institutionOther"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Specify Institution
                    </label>
                    <input
                      type="text"
                      name="institutionOther"
                      id="institutionOther"
                      value={formData.institutionOther}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your institution name"
                      className={`mt-1 block w-full border ${
                        errors.institutionOther ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                    />
                    {errors.institutionOther && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.institutionOther}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Working Professional Details */}
            {formData.userType === 'professional' && (
              <div className="mt-4">
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <Autocomplete
                    onLoad={onLoadCompany}
                    onPlaceChanged={onPlaceChangedCompany}
                    options={{
                      types: ['establishment'],
                      componentRestrictions: { country: 'in' },
                    }}
                  >
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder="Search your company"
                      className={`mt-1 block w-full border ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                    />
                  </Autocomplete>
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                  )}
                </div>

                {/* Job Title */}
                <div className="mt-4">
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                    className={`mt-1 block w-full border ${
                      errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={emailOTPVerified}
                  required
                  className={`mt-1 block w-full border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                <button
                  type="button"
                  onClick={handleSendEmailOTP}
                  disabled={sendingOTP || emailOTPVerified}
                  className={`ml-2 mt-1 px-4 py-2 border border-primary rounded-md shadow-sm text-primary ${
                    emailOTPVerified ? 'bg-gray-400 cursor-not-allowed' : 'bg-white'
                  } hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 flex items-center justify-center`}
                >
                  {sendingOTP ? (
                    <>
                      <FaSpinner className="animate-spin h-5 w-5 mr-2 text-primary" />
                      Sending...
                    </>
                  ) : emailOTPVerified ? (
                    <>
                      <FaCheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Verified
                    </>
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Email OTP */}
            {emailOTPRequested && !emailOTPVerified && (
              <div className="mt-4">
                <label htmlFor="emailOTP" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="flex space-x-2">
                  {formData.emailOTP.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      id={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOTPChange(e, index)}
                      onPaste={handleOTPPaste}
                      maxLength={1}
                      ref={(el) => {
                        if (el) {
                          otpRefs.current[index] = el;
                        }
                      }}
                      className={`w-12 h-12 text-center border ${
                        errors.emailOTP || errors[`otp-${index}`]
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none text-lg`}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft' && index > 0) {
                          otpRefs.current[index - 1]?.focus();
                        } else if (e.key === 'ArrowRight' && index < 5) {
                          otpRefs.current[index + 1]?.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleVerifyEmailOTP}
                  disabled={verifyingOTP || emailOTPVerified}
                  className={`mt-4 px-4 py-2 border border-primary rounded-md shadow-sm text-primary ${
                    emailOTPVerified ? 'bg-gray-400 cursor-not-allowed' : 'bg-white'
                  } hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 flex items-center justify-center`}
                >
                  {verifyingOTP ? (
                    <>
                      <FaSpinner className="animate-spin h-5 w-5 mr-2 text-primary" />
                      Verifying...
                    </>
                  ) : emailOTPVerified ? (
                    <>
                      <FaCheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Verified
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
                {errors.emailOTP && (
                  <p className="text-red-500 text-xs mt-1">{errors.emailOTP}</p>
                )}
              </div>
            )}

            {/* Password */}
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Minimum 8 characters with letters and numbers"
                  className={`mt-1 block w-full border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
              </div>
              <PasswordStrengthBar password={formData.password} />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mt-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <PhoneInput
                country={'in'}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                  autoFocus: false,
                }}
                inputClass={`mt-1 block w-full border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Delivery Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery Details</h3>
            {/* Where Study */}
            <div>
              <label htmlFor="whereStudy" className="block text-sm font-medium text-gray-700">
                Where are you studying?
              </label>
              <select
                name="whereStudy"
                id="whereStudy"
                value={formData.whereStudy}
                onChange={handleInputChange}
                required
                className={`mt-1 block w-full border ${
                  errors.whereStudy ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              >
                <option value="">Select an option</option>
                <option value="hostel">Hostel</option>
                <option value="pg">PG</option>
                <option value="home">Home</option>
                <option value="other">Other</option>
              </select>
              {errors.whereStudy && (
                <p className="text-red-500 text-xs mt-1">{errors.whereStudy}</p>
              )}
            </div>

            {/* Room Number */}
            {(formData.whereStudy === 'hostel' || formData.whereStudy === 'pg') && (
              <div className="mt-4">
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Number
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  id="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full border ${
                    errors.roomNumber ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                {errors.roomNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.roomNumber}</p>
                )}
              </div>
            )}

            {/* Hostel Name */}
            {(formData.whereStudy === 'hostel' || formData.whereStudy === 'pg') && (
              <div className="mt-4">
                <label
                  htmlFor="hostelName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hostel Name
                </label>
                <input
                  type="text"
                  name="hostelName"
                  id="hostelName"
                  value={formData.hostelName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your hostel name"
                  className={`mt-1 block w-full border ${
                    errors.hostelName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                {errors.hostelName && (
                  <p className="text-red-500 text-xs mt-1">{errors.hostelName}</p>
                )}
              </div>
            )}

            {/* Additional Delivery Information */}
            <div className="mt-4">
              <label
                htmlFor="additionalDeliveryInfo"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Delivery Information
              </label>
              <textarea
                name="additionalDeliveryInfo"
                id="additionalDeliveryInfo"
                value={formData.additionalDeliveryInfo}
                onChange={handleInputChange}
                required
                placeholder="Any additional information for delivery (e.g., landmarks, instructions)"
                className={`mt-1 block w-full border ${
                  errors.additionalDeliveryInfo ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              ></textarea>
              {errors.additionalDeliveryInfo && (
                <p className="text-red-500 text-xs mt-1">{errors.additionalDeliveryInfo}</p>
              )}
            </div>

            {/* Address */}
            <div className="mt-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Autocomplete
                onLoad={onLoadAddress}
                onPlaceChanged={onPlaceChangedAddress}
                options={{
                  types: ['establishment', 'geocode'], // Prioritize establishments and geocodes
                  componentRestrictions: { country: 'in' },
                }}
              >
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Search your address"
                  className={`mt-1 block w-full border ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
              </Autocomplete>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* Building Name */}
            <div className="mt-4">
              <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700">
                Building Name (Optional)
              </label>
              <input
                type="text"
                name="buildingName"
                id="buildingName"
                value={formData.buildingName}
                onChange={handleInputChange}
                placeholder="Enter your building name"
                className={`mt-1 block w-full border ${
                  errors.buildingName ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
              />
              {errors.buildingName && (
                <p className="text-red-500 text-xs mt-1">{errors.buildingName}</p>
              )}
            </div>

            {/* City and Postal Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full border ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full border ${
                    errors.postalCode ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-primary focus:border-primary focus:outline-none py-3 px-4`}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mt-4">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={!emailOTPVerified || loadingSignup}
              className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-white ${
                emailOTPVerified
                  ? 'bg-primary hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200`}
            >
              {loadingSignup ? (
                <>
                  <FaSpinner className="animate-spin h-5 w-5 mr-3 text-white" />
                  Signing Up...
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" />
                  Sign Up
                </>
              )}
            </button>
            {!emailOTPVerified && (
              <p className="text-red-500 text-xs mt-1">
                Please verify your email to proceed.
              </p>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
