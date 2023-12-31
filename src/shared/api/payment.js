import { API, graphqlOperation } from 'aws-amplify';
import { createHeavenlymatchRegisterAmmount } from '../../graphql/mutations';
import {  listHeavenlymatchRegisterAmmountByDate } from '../../graphql/queries';
import { message } from 'antd';

// create announcements in Dynamo DB
export const createNewRegisterAmmount = async (ammount) => {
  // remove $ sign from value cause price has Int data type
  const announcementDetails = {
    registerAmmount: ammount,
    type: 'heavenlyMatchUser',
  };
  try {
    const response = await API.graphql({
      query: createHeavenlymatchRegisterAmmount,
      variables: { input: announcementDetails },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const listHeavenlymatchRegistrationAmmount = async () => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listHeavenlymatchRegisterAmmountByDate, {
        type: 'heavenlyMatchUser',
        sortDirection: 'DESC',
      }),
    });
    const list = response.data.listHeavenlymatchRegisterAmmountByDate.items;
    const updatedList = list.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    return updatedList;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};
