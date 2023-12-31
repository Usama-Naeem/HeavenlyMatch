import { AMPLIFY_CONFIG } from '../../utilities/amplifyConfig';
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminSetUserMFAPreferenceCommand,
  AdminDeleteUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminRemoveUserFromGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { randomStrings } from '../../utilities';
import { Auth } from 'aws-amplify';
import { message } from 'antd';
import {
  ATTEMP_LIMIT_EXCEDED,
  REGULAR_EXPRESSION_PATTREN_ERROR,
} from '../constant/error';
import {
  sendEnableUserTemplatedEmail,
  sendSuspendTemplatedEmail,
} from './email';
import { EmailTemplates } from '../enum/email';

const client = new CognitoIdentityProviderClient(AMPLIFY_CONFIG);

export const addToCognitoGroup = async (values, userPoolId) => {
  const roleParams = {
    GroupName: values.role,
    Username: values?.email?.toLowerCase(),
    UserPoolId: userPoolId,
  };
  try {
    const command = new AdminAddUserToGroupCommand(roleParams);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const enableUserMFA = async (values, userPoolId) => {
  // Enable SMS MFA for the user
  const mfaParams = {
    UserPoolId: userPoolId,
    Username: values.email.toLowerCase(),
    SMSMfaSettings: {
      Enabled: true,
      PreferredMfa: true,
    },
  };

  try {
    const setUserMFAPreferenceCommand = new AdminSetUserMFAPreferenceCommand(
      mfaParams
    );
    await client.send(setUserMFAPreferenceCommand);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createCognitoUser = async (values, userPoolId, temporaryPassword) => {
  const params = {
    UserPoolId: userPoolId,
    Username: values.email.toLowerCase(),
    PhoneNumber: values.phoneNumber,
    DesiredDeliveryMediums: ['EMAIL'],
    TemporaryPassword: temporaryPassword,
    MessageAction: "SUPPRESS",
    PreferredMfaSetting: 'SMS_MFA',
    UserMFASettingList: ['SMS_MFA'],
    MFAOptions: {
      Enabled: true,
      PreferredMfa: true,
      AttributeName: 'phone_number',
    },
    UserAttributes: [
      {
        Name: 'email_verified',
        Value: 'true',
      },
      {
        Name: 'phone_number_verified',
        Value: 'true',
      },
      {
        Name: 'email',
        Value: values.email.toLowerCase(),
      },
      {
        Name: 'phone_number',
        Value: values.phoneNumber,
      },
      {
        Name: 'name',
        Value: `${values.firstName} ${values.lastName}`,
      },
    ],
  };

  try {
    const command = new AdminCreateUserCommand(params);

    const response = await client.send(command);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteAdminFromCognito = async (values, userPoolId) => {
  const params = {
    UserPoolId: userPoolId,
    Username: values.email.toLowerCase(),
  };
  try {
    const command = new AdminDeleteUserCommand(params);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    // Getting the current authenticated user info.
    const userInfo = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(userInfo, oldPassword, newPassword);
  } catch (error) {
    error.message === ATTEMP_LIMIT_EXCEDED
      ? message.error(
          'Change password limit exceeded, please try after some time.',
          [4]
        )
      : error.message === 'Incorrect username or password.'
      ? message.error('Incorrect old password.', [4])
      : error.message === REGULAR_EXPRESSION_PATTREN_ERROR
      ? message.error(
          "New Password and Confirm Password fields can't be null!",
          [4]
        )
      : message.error(error.message, [4]);
    throw Error(error.message);
  }
};

// Disable User from Cognito.
export const disableUserCognito = async (email, userPoolId) => {
  try {
    const addRoleParams = {
      Username: email,
      UserPoolId: userPoolId,
    };
    const command = new AdminDisableUserCommand(addRoleParams);
    await client.send(command);
  } catch (error) {
    throw Error(error);
  }
};
// Enable User from Cognito.
export const enableUserCognito = async (email, userPoolId) => {
  try {
    const addRoleParams = {
      Username: email,
      UserPoolId: userPoolId,
    };
    const command = new AdminEnableUserCommand(addRoleParams);
    await client.send(command);
  } catch (error) {
    throw Error(error);
  }
};

export const suspendUser = async (user, userPoolId) => {
  await Promise.all([
    await disableUserCognito(user.email, userPoolId),
    // commented this line of code due to ses issues
    await sendSuspendTemplatedEmail(
      [user?.email.toLowerCase()],
      EmailTemplates.SUSPEND,
      `${user?.firstName} ${user?.lastName}`
    ),
  ]);
};

export const enableSuspendedUser = async (user, userPoolId) => {
  await Promise.all([
    await enableUserCognito(user.email, userPoolId),
    // commented this line of code due to ses issues
    await sendEnableUserTemplatedEmail(
      [user?.email.toLowerCase()],
      EmailTemplates.ENABLE,
      `${user?.firstName} ${user?.lastName}`
    ),
  ]);
};

// This function updates congito user pool group.
export const cognitoUpdateGroup = async (
  currentGroup,
  newGroup,
  email,
  userPoolId
) => {
  try {
    // Remove user from group request params.
    const removeRoleParams = {
      GroupName: currentGroup,
      Username: email,
      UserPoolId: userPoolId,
    };

    // AWS-SDK remove user from group command.
    const command1 = new AdminRemoveUserFromGroupCommand(removeRoleParams);
    await client.send(command1);

    // Add user to group request params.
    const addRoleParams = {
      GroupName: newGroup,
      Username: email,
      UserPoolId: userPoolId,
    };

    // AWS-SDK add user to group command.
    const command2 = new AdminAddUserToGroupCommand(addRoleParams);
    const response = await client.send(command2);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
