export const AMPLIFY_CONFIG = {
  region: process.env.REACT_APP_AMPLIFY_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AMPLIFY_PUBLIC_KEY,
    secretAccessKey: process.env.REACT_APP_AMPLIFY_SECRET_KEY,
  },
  maxAttempts: 3,
};

// amazon SES default email
export const SES_DEFAULT_EMAIL = process.env.REACT_APP_SES_DEFAULT_EMAIL;