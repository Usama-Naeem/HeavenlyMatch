export const TeamMemberRoles = {
  ROLE: [
    {
      // note here, the value is not admin here because the group in cognito is of superadmin instead
      // of admin, and we need to show user the admin role in the dropdown
      value: 'superadmin',
      label: 'Super Admin',
    },
    {
      value: 'volunteer',
      label: 'Volunteer',
    },
  ],
};
