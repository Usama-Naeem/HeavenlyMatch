import { API, graphqlOperation } from 'aws-amplify';
import {
  listHeavenlymatchAdminsByDate,
  listHeavenlymatchAnnouncementsByDate,
  listHeavenlymatchUsersByDate,
} from '../../graphql/queries';
import { message } from 'antd';
import { createHeavenlymatchAnnouncements } from '../../graphql/mutations';
import { sendAnnouncementEmailTemplate } from './email';
import { EmailTemplates } from '../enum/email';
import { GenderType } from '../../enum';

export const listHeavenlymatchAnnouncements = async () => {
  let allItems = [];
  let nextToken = null;
  do {
    try {
      const response = await API.graphql({
        ...graphqlOperation(listHeavenlymatchAnnouncementsByDate, {
          type: 'heavenlyMatchUser',
          sortDirection: 'DESC',
          nextToken: nextToken,
        }),
      });
      const list = response.data.listHeavenlymatchAnnouncementsByDate.items;
      allItems.push(
        ...list.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })
      );
      nextToken = response.data.listHeavenlymatchAnnouncementsByDate.nextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);
  return allItems;
};

// create announcements in Dynamo DB
export const createAnnouncement = async (announceFor, type, values) => {
  const announcementDetails = {
    adminId: '234',
    announcementsType: type,
    announcementsFor: announceFor,
    announcementsText: values.announcementsText,
    type: 'heavenlyMatchUser',
  };
  try {
    const response = await API.graphql({
      query: createHeavenlymatchAnnouncements,
      variables: { input: announcementDetails },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

// Announcements notification code
export const sendAnnouncementNotification = (
  action,
  title,
  body,
  announcementFor
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const recipientIdsMapping = {
        femaleCandidate: listHeavenlymatchFemaleCandidatesEmail,
        maleCandidate: listHeavenlymatchMaleCandidatesEmail,
        all: async () => {
          const candidateEmails =
            await listHeavenlymatchMaleAndFemaleCandidatesEmail();
          return candidateEmails;
        },
      };
      let recipientsIds = [];

      for (const key in recipientIdsMapping) {
        if (announcementFor.includes(key)) {
          const getUserIds = recipientIdsMapping[key];
          const usetIds = await getUserIds();
          recipientsIds = recipientsIds.concat(usetIds);
        }
      }

      // Get the list of userIds from recipientIds
      const userIds = recipientsIds.map((a) => a.userId);

      // Split userIds into batches of 60 users each
      const batchSize = 60;
      const totalBatches = Math.ceil(userIds.length / batchSize);
      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const start = batchIndex * batchSize;
        const end = (batchIndex + 1) * batchSize;
        const userIdBatch = userIds.slice(start, end);
        // This is the firebase API to send notification
        await API.post('notifications', '/sendAnnouncements', {
          body: { userId: userIdBatch, body, action, title },
        });
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const sendEmailsToMultipleUsers = async (
  announcementFor,
  announcementText
) => {
  try {
    const recipientEmailsMapping = {
      admin: listHeavenlymatchAdminsEmail,
      volunteer: listHeavenlymatchVolunteersEmail,
      femaleCandidate: listHeavenlymatchFemaleCandidatesEmail,
      maleCandidate: listHeavenlymatchMaleCandidatesEmail,
      all: async () => {
        const adminsEmails = await listHeavenlymatchAdminsAndVolunteerEmail();
        const candidateEmails =
          await listHeavenlymatchMaleAndFemaleCandidatesEmail();
        return adminsEmails.concat(candidateEmails);
      },
    };

    let recipientsEmail = [];

    for (const key in recipientEmailsMapping) {
      if (announcementFor.includes(key)) {
        const getEmails = recipientEmailsMapping[key];
        const emails = await getEmails();
        recipientsEmail = recipientsEmail.concat(emails);
      }
    }
    await sendAnnouncementEmailTemplate(
      recipientsEmail,
      EmailTemplates.ANNOUNCEMENT,
      announcementText
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listHeavenlymatchFemaleCandidatesEmail = async (
  nextToken = null
) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchUsersByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          gender: { eq: GenderType.FEMALE },
        },
        limit: 100, // Set the desired batch size here (e.g., 100)
        nextToken, // Include the nextToken parameter in the query
      }),
    });

    const list = response.data.listHeavenlymatchUsersByDate.items;
    const candidatesEmail = list.map((item) => ({
      userId: item.id,
      email: item.email,
    }));


    // Check if there are more items to fetch (pagination)
    if (response.data.listHeavenlymatchUsersByDate.nextToken) {
      // If there is a nextToken, recursively call the function to fetch the next batch of data
      const nextBatch = await listHeavenlymatchFemaleCandidatesEmail(
        response.data.listHeavenlymatchUsersByDate.nextToken
      );

      // Merge the current batch with the next batch
      return candidatesEmail.concat(nextBatch);
    }

    return candidatesEmail;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};

export const listHeavenlymatchMaleCandidatesEmail = async (
  nextToken = null
) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchUsersByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          gender: { eq: GenderType.MALE },
        },
        limit: 100, // Set the desired batch size here (e.g., 100)
        nextToken, // Include the nextToken parameter in the query
      }),
    });

    const list = response.data.listHeavenlymatchUsersByDate.items;
    const candidatesEmail = list.map((item) => ({
      userId: item.id,
      email: item.email,
    }));

    // Check if there are more items to fetch (pagination)
    if (response.data.listHeavenlymatchUsersByDate.nextToken) {
      // If there is a nextToken, recursively call the function to fetch the next batch of data
      const nextBatch = await listHeavenlymatchMaleCandidatesEmail(
        response.data.listHeavenlymatchUsersByDate.nextToken
      );

      // Merge the current batch with the next batch
      return candidatesEmail.concat(nextBatch);
    }
    return candidatesEmail;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};

export const listHeavenlymatchAdminsEmail = async (nextToken = null) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchAdminsByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          role: { eq: 'superadmin' },
        },
        limit: 100, // Set the desired batch size here (e.g., 100)
        nextToken, // Include the nextToken parameter in the query
      }),
    });

    const list = response.data.listHeavenlymatchAdminsByDate.items;
    const adminsEmail = list.map((item) => ({
      email: item.email,
    }));

    // Check if there are more items to fetch (pagination)
    if (response.data.listHeavenlymatchAdminsByDate.nextToken) {
      // If there is a nextToken, recursively call the function to fetch the next batch of data
      const nextBatch = await listHeavenlymatchAdminsEmail(
        response.data.listHeavenlymatchAdminsByDate.nextToken
      );

      // Merge the current batch with the next batch
      return adminsEmail.concat(nextBatch);
    }
    return adminsEmail;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};

export const listHeavenlymatchVolunteersEmail = async (nextToken = null) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchAdminsByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        filter: {
          role: { eq: 'volunteer' },
        },
        limit: 100, // Set the desired batch size here (e.g., 100)
        nextToken, // Include the nextToken parameter in the query
      }),
    });

    const list = response.data.listHeavenlymatchAdminsByDate.items;
    const volunteersEmail = list.map((item) => ({
      email: item.email,
    }));

    // Check if there are more items to fetch (pagination)
    if (response.data.listHeavenlymatchAdminsByDate.nextToken) {
      // If there is a nextToken, recursively call the function to fetch the next batch of data
      const nextBatch = await listHeavenlymatchVolunteersEmail(
        response.data.listHeavenlymatchAdminsByDate.nextToken
      );

      // Merge the current batch with the next batch
      return volunteersEmail.concat(nextBatch);
    }
    return volunteersEmail;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};

export const listHeavenlymatchAdminsAndVolunteerEmail = async (
  nextToken = null
) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchAdminsByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        limit: 100, // Set the desired batch size here (e.g., 100)
        nextToken, // Include the nextToken parameter in the query
      }),
    });

    const list = response.data.listHeavenlymatchAdminsByDate.items;
    const adminsAndVolunteersEmail = list.map((item) => ({
      email: item.email,
    }));

    // Check if there are more items to fetch (pagination)
    if (response.data.listHeavenlymatchAdminsByDate.nextToken) {
      // If there is a nextToken, recursively call the function to fetch the next batch of data
      const nextBatch = await listHeavenlymatchAdminsAndVolunteerEmail(
        response.data.listHeavenlymatchAdminsByDate.nextToken
      );

      // Merge the current batch with the next batch
      return adminsAndVolunteersEmail.concat(nextBatch);
    }
    return adminsAndVolunteersEmail;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};

export const listHeavenlymatchMaleAndFemaleCandidatesEmail = async (
  nextToken = null
) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchUsersByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
        limit: 100, // Set the desired batch size here (e.g., 100)
        nextToken, // Include the nextToken parameter in the query
      }),
    });

    const list = response.data.listHeavenlymatchUsersByDate.items;
    const candidatesEmail = list.map((item) => ({
      email: item.email,
    }));

    // Check if there are more items to fetch (pagination)
    if (response.data.listHeavenlymatchUsersByDate.nextToken) {
      // If there is a nextToken, recursively call the function to fetch the next batch of data
      const nextBatch = await listHeavenlymatchMaleAndFemaleCandidatesEmail(
        response.data.listHeavenlymatchUsersByDate.nextToken
      );

      // Merge the current batch with the next batch
      return candidatesEmail.concat(nextBatch);
    }
    return candidatesEmail;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};
