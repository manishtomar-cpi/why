// src/app/pages/verify-email/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomToast from '../../components/CustomToast';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const VerifyEmailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setStatus('error');
        toast.error(
          <CustomToast
            icon={<FaExclamationTriangle size={24} />}
            title="Invalid Request"
            message="Missing token or email."
          />,
          { position: 'top-right' }
        );
        return;
      }

      try {
        const response = await axios.post('/api/auth/verify-email', { token, email });

        if (response.data.success) {
          setStatus('success');
          toast.success(
            <CustomToast
              icon={<FaCheckCircle size={24} />}
              title="Email Verified"
              message="Your email has been successfully verified."
            />,
            { position: 'top-right' }
          );
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          setStatus('error');
          toast.error(
            <CustomToast
              icon={<FaExclamationTriangle size={24} />}
              title="Verification Failed"
              message={response.data.message}
            />,
            { position: 'top-right' }
          );
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        setStatus('error');
        toast.error(
          <CustomToast
            icon={<FaExclamationTriangle size={24} />}
            title="Error"
            message={error.response?.data?.message || 'Something went wrong.'}
          />,
          { position: 'top-right' }
        );
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {status === 'loading' && <div>Verifying your email...</div>}
      {status === 'success' && <div>Verification successful! Redirecting...</div>}
      {status === 'error' && <div>Verification failed. Please try again.</div>}
      <ToastContainer />
    </div>
  );
};

export default VerifyEmailPage;
