// src/app/utils/sendEmail.ts

import AWS from 'aws-sdk';

const SES_REGION = process.env.MY_AWS_REGION as string;
const SES_FROM_EMAIL = process.env.SES_FROM_EMAIL as string;

if (!SES_REGION || !SES_FROM_EMAIL) {
  throw new Error(
    'Please define MY_AWS_REGION and SES_FROM_EMAIL in your .env.local'
  );
}

AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: SES_REGION,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  const params: AWS.SES.SendEmailRequest = {
    Source: SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: html,
          Charset: 'UTF-8',
        },
      },
    },
  };

  try {
    await ses.sendEmail(params).promise();
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};
