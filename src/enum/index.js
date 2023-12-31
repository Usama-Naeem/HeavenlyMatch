import { InputNumber, Input, Select, Switch, Checkbox } from 'antd';

// Input types for Ant Design.
export const InputType = {
  SELECT: 'select',
  TEXT: 'text',
  STRING: 'string',
  NUMBER: 'number',
  SWITCH: 'switch',
  CHECKBOX: 'checkbox',
};

// Input Types for Ant Design Editable Table.
export const editableTableInputConfig = (inputProps) => ({
  [InputType.NUMBER]: <InputNumber {...inputProps} />,
  [InputType.STRING]: <Input {...inputProps} />,
  [InputType.SELECT]: <Select {...inputProps} />,
  [InputType.SWITCH]: <Switch {...inputProps} />,
  [InputType.CHECKBOX]: <Checkbox {...inputProps} />,
});

export const userStatusTypes = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  ARCHIVE: 'archive',
  INVITED: 'invited',
  REJECT: 'reject',
};

export const userStatusOptions = [
  {
    key: userStatusTypes.ACTIVE,
    value: userStatusTypes.ACTIVE,
    label: 'Active',
  },

  {
    key: userStatusTypes.ARCHIVE,
    value: userStatusTypes.ARCHIVE,
    label: 'Archive',
  },
  {
    key: userStatusTypes.SUSPENDED,
    value: userStatusTypes.SUSPENDED,
    label: 'Suspended',
  },
];

export const userStatusOptionsExceptInvite = [
  {
    key: userStatusTypes.ACTIVE,
    value: userStatusTypes.ACTIVE,
    label: 'Active',
  },

  {
    key: userStatusTypes.ARCHIVE,
    value: userStatusTypes.ARCHIVE,
    label: 'Archive',
  },
  {
    key: userStatusTypes.SUSPENDED,
    value: userStatusTypes.SUSPENDED,
    label: 'Suspended',
  },
];

export const acceptOrRejectOptions = [
  {
    key: 'approve',
    value: 'approve',
    label: 'Approve',
  },

  {
    key: 'reject',
    value: 'reject',
    label: 'Reject',
  },
];

export const dismissOrSuspendOptions = [
  {
    key: 'dismiss',
    value: 'dismiss',
    label: 'Dismiss',
  },

  {
    key: 'suspended',
    value: 'suspended',
    label: 'Suspended',
  },
];

export const GroupType = {
  SUPER_ADMIN: 'superadmin',
  ADMIN: 'admin',
  VOLUNTEER: 'volunteer',
  MALE_CANDIDATE: 'maleCandidate',
  FEMALE_CANDIDATE: 'femaleCandidate',
};

export const AnnouncementType = {
  IN_APP: 'inApp',
  EMAIL: 'email',
};

export const GenderType = {
  MALE: 'male',
  FEMALE: 'female',
};

// Allowed goups to access backoffice.
export const backofficeGroups = [
  GroupType.SUPER_ADMIN,
  GroupType.ADMIN,
  GroupType.VOLUNTEER,
];

export const adminRoleOptions = [
  {
    key: GroupType.SUPER_ADMIN,
    value: GroupType.SUPER_ADMIN,
    label: 'Super Admin',
  },
  {
    key: GroupType.VOLUNTEER,
    value: GroupType.VOLUNTEER,
    label: 'Volunteer',
  },
];

export const PaymentType = {
  PAID_CANDIDATE: 'paidcandidate',
  EXCLUDED_FROM_PAYMENT: 'excludedfrompayment',
};

export const paymentGroups = [
  PaymentType.PAID_CANDIDATE,
  PaymentType.EXCLUDED_FROM_PAYMENT,
];

export const candidatePaymentExclusion = [
  {
    key: PaymentType.PAID_CANDIDATE,
    value: PaymentType.PAID_CANDIDATE,
    label: 'Paid Candidate',
  },
  {
    key: PaymentType.EXCLUDED_FROM_PAYMENT,
    value: PaymentType.EXCLUDED_FROM_PAYMENT,
    label: 'Excluded from payment',
  },
];

export const candidateStatusTypes = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  ARCHIVE: 'archive',
  INVITED: 'invited',
};

export const candidateModerationTypes = {
  BIOUPDATE: 'updateBio',
  PICCHANGE: 'picChange',
  NEWPROFILE: 'newProfile',
};

export const candidateModerationStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const adminActionTypes = {
  REJECT: 'reject',
  APPROVE: 'approve',
  DISMISS: 'dismiss',
};

export const candidateStatusOptions = [
  {
    key: candidateStatusTypes.ACTIVE,
    value: candidateStatusTypes.ACTIVE,
    label: 'Active',
  },

  {
    key: candidateStatusTypes.INVITED,
    value: candidateStatusTypes.INVITED,
    label: 'Invited',
  },
  {
    key: candidateStatusTypes.SUSPENDED,
    value: candidateStatusTypes.SUSPENDED,
    label: 'Suspended',
  },
  {
    key: candidateStatusTypes.ARCHIVE,
    value: candidateStatusTypes.ARCHIVE,
    label: 'Archive',
  },
];

export const candidateModerationTypeOptions = [
  {
    key: candidateModerationTypes.BIOUPDATE,
    value: candidateModerationTypes.BIOUPDATE,
    label: 'Bio update',
  },

  {
    key: candidateModerationTypes.PICCHANGE,
    value: candidateModerationTypes.PICCHANGE,
    label: 'Picture change',
  },
  {
    key: candidateModerationTypes.NEWPROFILE,
    value: candidateModerationTypes.NEWPROFILE,
    label: 'New profile',
  },
];

export const adminStatusOptions = [
  {
    key: candidateStatusTypes.ACTIVE,
    value: candidateStatusTypes.ACTIVE,
    label: 'Active',
  },

  {
    key: candidateStatusTypes.INVITED,
    value: candidateStatusTypes.INVITED,
    label: 'Invited',
  },
  {
    key: candidateStatusTypes.ARCHIVE,
    value: candidateStatusTypes.ARCHIVE,
    label: 'Archive',
  },
];

export const announcementForOptions = [
  {
    key: GroupType.ADMIN,
    value: GroupType.ADMIN,
    label: 'Admin',
  },
  {
    key: GroupType.VOLUNTEER,
    value: GroupType.VOLUNTEER,
    label: 'Volunteer',
  },
  {
    key: GroupType.FEMALE_CANDIDATE,
    value: GroupType.FEMALE_CANDIDATE,
    label: 'Female Candidates',
  },
  {
    key: GroupType.MALE_CANDIDATE,
    value: GroupType.MALE_CANDIDATE,
    label: 'Male Candidates',
  },
];

export const AnnoucementType = [
  {
    key: 'email',
    value: 'email',
    label: 'Email',
  },
  {
    key: 'inApp',
    value: 'inApp',
    label: 'In App',
  },
];

export const selectStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: '16px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black', // Adjust the text color for selected and unselected options
    background: state.isSelected ? '#3366FF' : 'white', // Adjust the background color for selected and unselected options
  }),
};

// Input types for Ant Design.
export const PAID_CANDIDATE = 'Paid Candidate';
export const EXCLUDED_FROM_PAYMENT = 'Excluded from Payment';
export const FREE_CANDIDATE = 'Free Candidate';
export const ALL = 'All';
export const FILTER_LABEL = 'Filter by Payment';
