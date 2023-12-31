import { message } from 'antd';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import {
  getHeavenlymatchUserLookingFor,
  getHeavenlymatchUsers,
  listHeavenlymatchMatches,
  listHeavenlymatchUserMediaFiles,
  listHeavenlymatchUserReportsByDate,
  listHeavenlymatchUsersByDate,
} from '../../graphql/queries';
import {
  createHeavenlymatchMatches,
  createHeavenlymatchUserMediaFiles,
  deleteHeavenlymatchUserMediaFiles,
  deleteHeavenlymatchUserReports,
  updateHeavenlymatchUsers,
} from '../../graphql/mutations';
import {
  sendBioApprovalEmailTemplate,
  sendBioRejectionEmailTemplate,
  sendDismissSuspendUserEmailTemplate,
  sendProfileRejectionEmailTemplate,
  sendSuspendUserEmailTemplate,
} from './email';
import { EmailTemplates } from '../enum/email';
import { disableUserCognito } from './cognito';
import { candidateModerationStatus } from '../../enum';
import { Client } from '@twilio/conversations';

// list candidates those profile is approved by admin
export const listHeavenlymatchApprovedCandidates = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    try {
      const response = await API.graphql({
        ...graphqlOperation(listHeavenlymatchUsersByDate, {
          type: 'heavenlyMatchUser',
          sortDirection: 'DESC',
          filter: {
            and: [
              { isNewProfile: { eq: true } },
              {
                newProfileApproved: { ne: candidateModerationStatus.PENDING },
              },
              {
                isReported: { ne: true },
              },
            ],
          },
          nextToken: nextToken, // Pass the nextToken for pagination
        }),
      });

      const list = response.data.listHeavenlymatchUsersByDate.items;
      allItems.push(
        ...list.filter(
          (item) =>
            item.newProfileApproved !== candidateModerationStatus.REJECTED
        )
      );

      nextToken = response.data.listHeavenlymatchUsersByDate.nextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  // Map the items to add the 'key' property and return the final list
  const updatedList = allItems.map((item) => {
    return {
      ...item,
      key: item?.id,
    };
  });

  return updatedList;
};

// list candidates those profile is not yet approved by admin (pending )
export const listHeavenlymatchPendingCandidates = async () => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchUsersByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          or: [
            { newProfileApproved: { eq: candidateModerationStatus.PENDING } },
            { bioApproved: { eq: candidateModerationStatus.PENDING } },
            { imagesApproved: { eq: candidateModerationStatus.PENDING } },
          ],
        },
      }),
    });

    const list = response?.data?.listHeavenlymatchUsersByDate.items;
    const updatedList = list.reduce((array, item) => {
      // Case 1: If user change both image and bio at a same time
      if (
        item.bioApproved === candidateModerationStatus.PENDING &&
        item.imagesApproved === candidateModerationStatus.PENDING
      ) {
        array.push({ ...item, imagesApproved: '', imageModerationType: '' });
        delete item.bioApproved;
        delete item.bioModerationType;
      }
      // Case 2: If user change only bio
      else if (item.bioApproved === candidateModerationStatus.PENDING) {
        array.push({ ...item });
      }
      // Case 3: This will work in both case i.e. if user update bio and image at a same time and if user only update image
      if (item.imagesApproved === candidateModerationStatus.PENDING) {
        array.push({ ...item });
      }
      // Case 4: this will work when user create a new profile
      if (item.isNewProfile === true && item.moderationType === 'newProfile') {
        array.push(item);
      }
      return array;
    }, []);
    return updatedList;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// list candidates those profile is reported by someone
export const listHeavenlymatchReportedCandidates = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    try {
      const response = await API.graphql({
        ...graphqlOperation(listHeavenlymatchUserReportsByDate, {
          type: 'heavenlyMatchUser',
          sortDirection: 'DESC',
          nextToken: nextToken, // Pass the nextToken for pagination
        }),
      });

      const list = response.data.listHeavenlymatchUserReportsByDate.items;
      allItems.push(
        ...list.map((item) => {
          return {
            ...item,
            key: item?.id,
            reportedDate: dateConverter(item.createdAt),
          };
        })
      );

      nextToken = response.data.listHeavenlymatchUserReportsByDate.nextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

// delete report record
export const deleteReportedUserRecordFromDynamo = async (id) => {
  try {
    const response = await getReportedCandidateRecords(id);
    response.forEach(async (el) => {
      const reportedRecordDetails = {
        id: el.id,
      };
      const deletedReportRecord = await API.graphql({
        query: deleteHeavenlymatchUserReports,
        variables: { input: reportedRecordDetails },
      });
      return deletedReportRecord;
    });
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const listMatchedCandidates = async (id, nextToken = null) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchMatches, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          and: [
            {
              or: [
                { requestedFromId: { eq: id } },
                { requestedToId: { eq: id } },
              ],
            },
            { status: { eq: 'matched' } },
          ],
        },
        limit: 1000,
        nextToken: nextToken,
      }),
    });

    const list = response.data.listHeavenlymatchMatches.items;
    const allMatches = [];

    await Promise.all(
      list.map(async (user) => {
        // If the user's own record, skip it
        if (user.requestedFromId === id) {
          // Get the other user's object through requestedToId
          const getCurrentUserMatchesDetails = await getRequestFromUserDetails(
            user.requestedToId
          );
          getCurrentUserMatchesDetails.items[0].matchDate = new Date(
            user.createdAt
          )
            .toDateString()
            .split(' ')
            .splice(1)
            .join('-');
          allMatches.push(getCurrentUserMatchesDetails.items[0]);
        } else if (user.requestedToId === id) {
          // Get the other user's object through requestedFromId
          const getCurrentUserMatchesDetails = await getRequestFromUserDetails(
            user.requestedFromId
          );
          getCurrentUserMatchesDetails.items[0].matchDate = new Date(
            user.createdAt
          )
            .toDateString()
            .split(' ')
            .splice(1)
            .join('-');
          allMatches.push(getCurrentUserMatchesDetails.items[0]);
        }
      })
    );

    return {
      items: allMatches,
      nextToken: response.data.listHeavenlymatchMatches.nextToken,
    };
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

///get reportedCandidateRecordsById
export const getReportedCandidateRecords = async (id) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchUserReportsByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          reportedUserId: { eq: id },
        },
      }),
    });

    const list = response.data.listHeavenlymatchUserReportsByDate.items;
    return list;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// list candidates matches
export const getRequestFromUserDetails = async (
  requestFromId,
  nextToken = null
) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchUsersByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          id: { eq: requestFromId },
        },
        limit: 200, // Set a reasonable limit to the number of records to fetch in one request
        nextToken: nextToken, // Include the nextToken in the query
      }),
    });
    const list = response.data.listHeavenlymatchUsersByDate.items;
    return {
      items: list,
      nextToken: response.data.listHeavenlymatchUsersByDate.nextToken, // Return the nextToken from the response
    };
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const heightConversion = (height) => {
  const [feetStr, inchesStr] = height.split('.');
  // Convert the feet and inches strings to numbers
  const feet = parseInt(feetStr, 10);
  const inches = parseInt(inchesStr, 10);
  return { feet, inches };
};

export const heightConvertIntoFeets = (val) => {
  let feet = 0;
  let inches = 0;
  if (val) {
    feet = parseInt(val.split('.')[0]);
    inches = parseInt(val.split('.')[1]);
  }
  return { feet, inches };
};

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
    throw new Error(err.errors[0].message);
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

// create candidate matches in Dynamo DB
export const createCandidateMatch = async (values) => {
  const matchDetails = {
    requestedFromId: values.requestedFromId,
    requestedToId: values.requestedToId,
    // matched: 'false',
  };
  try {
    const response = await API.graphql({
      query: createHeavenlymatchMatches,
      variables: { input: matchDetails },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

// This function returns the label for a key in an array of object,
export const getLabelForKey = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      return arr[i].label;
    }
  }
  return null;
};

export const cleanedData = (data) => {
  const response = data
    ?.replace(/\[|\]/g, '') // remove square brackets
    .split(',') // split string into array
    .map((str) => str.trim()) // remove whitespace from each string
    .map((str) => {
      if (str.includes('Candidate')) {
        return str.replace('Candidate', ' Candidates');
      } else if (str.includes('inApp')) {
        return str.replace('inApp', ' In App');
      } else {
        return str;
      }
    }) // add space before "Customer" if present
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1)) // capitalize first letter of each string
    .join(', '); // join array into string with comma and space separator

  return response;
};

export const getUserByEmail = async (email, userType) => {
  try {
    const response = await API.graphql({
      query: userType,
      variables: {
        filter: {
          email: {
            eq: email,
          },
        },
      },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    message.error(err.errors[0].message);
    throw Error(err.errors[0].message);
  }
};

export const getUserById = async (id, userType) => {
  try {
    const response = await API.graphql({
      query: userType,
      variables: {
        filter: {
          id: {
            eq: id,
          },
        },
      },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    message.error(err.errors[0].message);
    throw Error(err.errors[0].message);
  }
};

export const listHeavenlymatchPaidCandidates = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    try {
      const response = await API.graphql({
        ...graphqlOperation(listHeavenlymatchUsersByDate, {
          type: 'heavenlyMatchUser',
          sortDirection: 'DESC',
          filter: {
            and: [
              { isPaid: { eq: true } },
              { paymentExclusion: { eq: false } },
            ],
          },
          nextToken: nextToken,
        }),
      });
      const list = response.data.listHeavenlymatchUsersByDate.items;
      allItems.push(
        ...list.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })
      );
      nextToken = response.data.listHeavenlymatchUsersByDate.nextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

export const listHeavenlymatchExcludeFromPaymentsCandidates = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    try {
      const response = await API.graphql({
        ...graphqlOperation(listHeavenlymatchUsersByDate, {
          type: 'heavenlyMatchUser',
          sortDirection: 'DESC',
          filter: {
            and: [
              { isPaid: { eq: false } },
              { paymentExclusion: { eq: true } },
            ],
          },
          nextToken: nextToken,
        }),
      });
      const list = response.data.listHeavenlymatchUsersByDate.items;
      allItems.push(
        ...list.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })
      );
      nextToken = response.data.listHeavenlymatchUsersByDate.nextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

export const listHeavenlymatchPaymentFreeCandidates = async () => {
  let allItems = [];
  let nextToken = null;

  do {
    try {
      const response = await API.graphql({
        ...graphqlOperation(listHeavenlymatchUsersByDate, {
          type: 'heavenlyMatchUser',
          sortDirection: 'DESC',
          filter: {
            and: [
              { isPaid: { eq: false } },
              { paymentExclusion: { eq: false } },
            ],
          },
          nextToken: nextToken,
        }),
      });
      const list = response.data.listHeavenlymatchUsersByDate.items;
      allItems.push(
        ...list.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })
      );
      nextToken = response.data.listHeavenlymatchUsersByDate.nextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

// save candidate images in Dynamo DB
export const uploadCandidateProfileImages = async (data, response) => {
  const imageDetails = {
    userId: data?.id,
    file: response?.key,
    type: 'heavenlyMatchUser',
  };
  try {
    const response = await API.graphql({
      query: createHeavenlymatchUserMediaFiles,
      variables: { input: imageDetails },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const getCandidateProfileImages = async (id) => {
  try {
    const storageKey = await Storage.get(id);
    return storageKey;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteImageFromDynamo = async (data) => {
  const imageDetails = {
    id: data?.fileId,
  };
  try {
    const deletedImage = await API.graphql({
      query: deleteHeavenlymatchUserMediaFiles,
      variables: { input: imageDetails },
    });
    return deletedImage;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

// images that need admin approval
export const fetchGalleryUpdatedImages = async (data) => {
  try {
    const result = await API.graphql(
      graphqlOperation(getHeavenlymatchUsers, { id: data?.id })
    );
    // add usermedia files and feedbacks in record objectt
    const userProfileDetails =
      result.data.getHeavenlymatchUsers.userMediaFiles.items;
    const pendingImages = userProfileDetails.filter(
      (item) => item.approved === candidateModerationStatus.PENDING
    );
    data.userMediaFiles = pendingImages;
  } catch (error) {
    throw new Error(error.message);
  }
};

// images that need admin approval
export const pushImagesInRecordObject = async (data) => {
  try {
    const result = await API.graphql(
      graphqlOperation(getHeavenlymatchUsers, { id: data?.id })
    );
    // add usermedia files and feedbacks in record objectt
    const userProfileDetails =
      result.data.getHeavenlymatchUsers.userMediaFiles.items;
    data.userMediaFiles = userProfileDetails;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const swapObjectWithCoverTrue = async (id) => {
  try {
    const result = await API.graphql(
      graphqlOperation(getHeavenlymatchUsers, { id: id })
    );
    // add usermedia files and feedbacks in record objectt
    const array = result.data.getHeavenlymatchUsers.userMediaFiles.items;

    for (let i = 0; i < array.length; i++) {
      if (array[i].cover === true) {
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        break;
      }
    }
    return array;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Api to get current user images whose cover is true
export const getCurrentUserWithCoverTrue = async (userData, nextToken) => {
  try {
    const currentUserImages = await API.graphql({
      query: listHeavenlymatchUserMediaFiles,
      variables: {
        filter: {
          and: [{ userId: { eq: userData?.id } }, { cover: { eq: true } }],
        },
        limit: 300, // Change this to the desired number of items per page
        nextToken: nextToken, // Pass the nextToken here for pagination
      },
      authMode: 'API_KEY',
    });
    const data =
      currentUserImages?.data?.listHeavenlymatchUserMediaFiles?.items[0];
    // Return an object with both data and nextToken
    return {
      data: data,
      nextToken:
        currentUserImages?.data?.listHeavenlymatchUserMediaFiles?.nextToken,
    };
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const rejectUserProfileChanges = async (
  user,
  rejectionText,
  updateText
) => {
  await Promise.all([
    await updateUser(updateText, updateHeavenlymatchUsers),
    // commented this line of code due to ses issues
    await sendProfileRejectionEmailTemplate(
      [user.email.toLowerCase()],
      EmailTemplates.PROFILE_REJECTION,
      `${user.firstName} ${user.lastName}`,
      rejectionText
    ),
  ]);
};

export const rejectUserBioChanges = async (user, rejectionText, updateText) => {
  await Promise.all([
    await updateUser(updateText, updateHeavenlymatchUsers),
    // commented this line of code due to ses issues
    await sendBioRejectionEmailTemplate(
      [user.email.toLowerCase()],
      EmailTemplates.BIO_UPDATE_REJECTION,
      `${user.firstName} ${user.lastName}`,
      rejectionText
    ),
  ]);
};

export const suspendReportedUser = async (
  suspensionReason,
  user,
  updateText,
  userPoolId
) => {
  await Promise.all([
    // commented this line of code due to ses issues
    await sendSuspendUserEmailTemplate(
      suspensionReason,
      [user.email.toLowerCase()],
      EmailTemplates.PROFILE_SUSPEND,
      `${user.firstName} ${user.lastName}`
    ),
    await disableUserCognito(user?.email, userPoolId),
    await updateUser(updateText, updateHeavenlymatchUsers),
  ]);
};

export const dismissUserSuspendAction = async (
  user,
  updateText,
  reportedByUserEmail
) => {
  await Promise.all([
    await updateUser(updateText, updateHeavenlymatchUsers),
    await sendDismissSuspendUserEmailTemplate(
      [reportedByUserEmail.toLowerCase()],
      EmailTemplates.DISMISS_PROFILE_SUSPEND,
      `${user.reportedByUser.displayName}`,
      `${user.reportedUser.displayName}`
    ),
  ]);
};

export const approveUserBioChanges = async (user, updateText) => {
  await Promise.all([
    await updateUser(updateText, updateHeavenlymatchUsers),
    // commented this line of code due to ses issues
    await sendBioApprovalEmailTemplate(
      [user.email.toLowerCase()],
      EmailTemplates.BIO_APPROVAL,
      `${user.firstName} ${user.lastName}`
    ),
  ]);
};

export const dateConverter = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const validateName = (name) => {
  if (!name.trim())
    return Promise.reject(new Error('Please enter a valid name'));

  //Regex for numbers and special characters.
  if (/^[a-zA-Z ]{3,50}$/.test(name)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Please enter only alphabets letters'));
};

export const getHeavenlyMatchUser = async (id) => {
  try {
    const result = await API.graphql(
      graphqlOperation(getHeavenlymatchUsers, { id: id })
    );
    const response = result.data.getHeavenlymatchUsers;
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Send Profile approved notification
export const sendProfileApprovedNotification = (
  action,
  title,
  body,
  userId
) => {
  const triggeredUser = '*';
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.post('notifications', '/sendNotification', {
        body: { userId, triggeredUser, body, action, title },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// Send Profile changes rejected notification
export const sendProfileUpdateRejectedNotification = (
  action,
  title,
  body,
  userId
) => {
  const triggeredUser = '*';
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.post('notifications', '/sendNotification', {
        body: { userId, triggeredUser, body, action, title },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// Send Profile changes approved notification
export const sendProfileUpdateApprovedNotification = (
  action,
  title,
  body,
  userId
) => {
  const triggeredUser = '*';
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.post('notifications', '/sendNotification', {
        body: { userId, triggeredUser, body, action, title },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const calculateYearDifference = (date1) => {
  const date2 = new Date();
  const format = formatDate(date2);
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const firstDate = parseDate(date1);
  const secondDate = parseDate(format);

  const yearDiff = secondDate.getFullYear() - firstDate.getFullYear();
  const monthDiff = secondDate.getMonth() - firstDate.getMonth();
  const dayDiff = secondDate.getDate() - firstDate.getDate();

  // Check if the second date is earlier in the year or if it's the same month and date but an earlier year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return yearDiff - 1;
  } else {
    return yearDiff;
  }
};

export const getTwilioToken = async (identity) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.get('twilio', `/token?identity=${identity}`);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUserDisplayNameInConversations = async (
  token,
  displayName,
  userId
) => {
  const client = new Client(token);
  const conversations = await client.getSubscribedConversations();

  for (let i = 0; i < conversations.items.length; i++) {
    const dummyConversation = conversations.items[i];
    const userDetails = await dummyConversation.getAttributes();

    if (userDetails[userId]) {
      userDetails[userId].name = displayName || 'Test';
      await dummyConversation.updateAttributes(userDetails);
    }
  }
};

export const updateUserCoverImageInConversations = async (
  token,
  imagePath,
  userId
) => {
  const client = new Client(token);
  const conversations = await client.getSubscribedConversations();

  for (let i = 0; i < conversations.items.length; i++) {
    const dummyConversation = conversations.items[i];
    const userDetails = await dummyConversation.getAttributes();

    if (userDetails[userId]) {
      userDetails[userId].image = imagePath || '';
      await dummyConversation.updateAttributes(userDetails);
    }
  }
};

export const getHeavenlyMatchLookingFors = async (id) => {
  try {
    const result = await API.graphql(
      graphqlOperation(getHeavenlymatchUserLookingFor, { id: id })
    );
    const response = result?.data?.getHeavenlymatchUserLookingFor;
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
