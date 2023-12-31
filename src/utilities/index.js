// this function generates a temporary password with base 36
export const randomStrings = () => Math.random().toString(36).slice(2, 12);

// this function returns true or false based on the screen size
export const isMobileScreen = () => window.innerWidth < 600;

export const shouldSidebarOpen = () => {
  const isMobile = isMobileScreen();

  if (isMobile) {
    return false;
  }
  return true;
};

export const passwordValidation = (password) => {
  let passwordRegex =
    /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,30}$/g;
  return passwordRegex.test(password);
};

export const PHONELENGTH = 'The phone number must have 10 digits!';
export const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\b\.[a-zA-Z]{2,}$/;
export const INVITATION_SENT = 'Invitation sent successfully';
export const ADD_ATLEAST_ONE_EMAIL = 'Add at least one email to invite';
export const INVALID_EMAIL_ADDRESS = 'Invalid email address';
export const SUSPEND_USER_PROFILE_MESSAGE =
  'User profile is suspended successfully';
export const ANNOUNCEMENT = 'announcement';
export const PROFILE = 'profile';
export const NEW_ANNOUNCEMENT = 'New Announcement';
export const ACCOUNT_APPROVED = 'Account Approved';
export const PROFILE_CHANGES_REJECTED = 'Profile Changes Rejected';
export const PROFILE_CHANGES_APPROVED = 'Profile Changes Approved';
export const PROFILE_APPROVED = 'Your account has been approved';
export const PROFILE_UPDATE_REJECTED =
  'Your profile changes have been rejected. Check your email for details.';
export const PROFILE_UPDATE_APPROVED =
  'Your profile changes have been approved';
export const ANNOUNCEMENT_WARNING =
  'Please add announcement text and select checkboxes';
