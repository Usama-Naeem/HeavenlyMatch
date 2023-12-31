import { message } from 'antd';
import { API, graphqlOperation } from 'aws-amplify';
import { createHeavenlymatchAdmin } from '../../graphql/mutations';
import {
  listHeavenlymatchAdmins,
  listHeavenlymatchAdminsByDate,
  listHeavenlymatchUserGeneralInfos,
  listHeavenlymatchUserLookingFors,
  listHeavenlymatchUsers,
} from '../../graphql/queries';

export const listHeavenlymatcNonArchiveAdmins = async (nextToken) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchAdminsByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          status: { ne: 'archive' },
        },
        nextToken: nextToken, // Pass the nextToken for pagination
      }),
    });
    const list = response.data.listHeavenlymatchAdminsByDate.items;
    const paginationToken =
      response.data.listHeavenlymatchAdminsByDate.nextToken;

    return { items: list, nextToken: paginationToken }; // Return both items and nextToken
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const listHeavenlymatcArchiveAdmins = async (nextToken) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchAdminsByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          status: { eq: 'archive' },
        },
        nextToken: nextToken, // Pass the nextToken for pagination
      }),
    });
    const list = response.data.listHeavenlymatchAdminsByDate.items;
    const paginationToken =
      response.data.listHeavenlymatchAdminsByDate.nextToken;

    return { items: list, nextToken: paginationToken }; // Return both items and nextToken
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// create user in Dynamo DB
export const createDynamoUser = async (values) => {
  const userDetails = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    status: 'invited',
    phoneNumber: values.phoneNumber,
    role: values.role,
    isArchive: false,
    type: 'heavenlyMatchUser',
    username: 'hellouser',
  };
  try {
    const response = await API.graphql({
      query: createHeavenlymatchAdmin,
      variables: { input: userDetails },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

// Update user details in dynamo db
export const updateUser = async (editUser, userType) => {
  try {
    const response = await API.graphql({
      query: userType,
      variables: { input: editUser },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const getNonArchiveAminTableData = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    const response = await listHeavenlymatcNonArchiveAdmins(nextToken);

    const modifyNonArchiveTeamDetails = response.items.map((teamDetails) => ({
      ...teamDetails,
      key: teamDetails.id,
      // role: RoleTypes[teamDetails.role],
      // status: StatusTypes[teamDetails.status],
    }));

    allItems.push(...modifyNonArchiveTeamDetails);
    nextToken = response.nextToken;
  } while (nextToken);

  return allItems;
};

export const getArchiveAminTableData = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    const response = await listHeavenlymatcArchiveAdmins(nextToken);

    const modifyArchiveTeamDetails = response.items.map((teamDetails) => ({
      ...teamDetails,
      key: teamDetails.id,
      // role: RoleTypes[teamDetails.role],
      // status: StatusTypes[teamDetails.status],
    }));

    allItems.push(...modifyArchiveTeamDetails);
    nextToken = response.nextToken;
  } while (nextToken);

  return allItems;
};

export const emailOrPhoneExist = async (data = '') => {
  const filteration = {
    or: [
      { email: { eq: data.email.toLowerCase() } },
      { phoneNumber: { eq: data.phoneNumber } },
    ],
  };

  try {
    // if the user is a superadmin/volunteer
    const responseAdmins = await API.graphql({
      query: listHeavenlymatchAdmins,
      variables: { filter: filteration },
      authMode: 'API_KEY',
    });
    // if the user is a candidate
    const responseCandidates = await API.graphql({
      query: listHeavenlymatchUsers,
      variables: { filter: filteration },
      authMode: 'API_KEY',
    });
    // if the admin or candidate email or phone number already exist
    const exist =
      responseAdmins.data.listHeavenlymatchAdmins.items.length ||
      responseCandidates.data.listHeavenlymatchUsers.items.length
        ? true
        : false;
    return exist;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const listHeavenlymatcUserGeneralInfo = async (id) => {
  try {
    const response = await API.graphql({
      query: listHeavenlymatchUserGeneralInfos,
      variables: {
        filter: {
          id: { eq: id },
        },
      },
      authMode: 'API_KEY',
    });
    const list = response.data.listHeavenlymatchUserGeneralInfos.items[0];
    const data = { ...list };
    return data;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};

export const listHeavenlymatcUser = async (id) => {
  try {
    const response = await API.graphql({
      query: listHeavenlymatchUsers,
      variables: {
        filter: {
          id: { eq: id },
        },
      },
      authMode: 'API_KEY',
    });
    const list = response.data.listHeavenlymatchUsers.items[0];
    const data = { ...list };
    return data;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};