import { API } from 'aws-amplify';
import {
  updateHeavenlymatchUserAppSettings,
} from '../../graphql/mutations';
import { listHeavenlymatchUserAppSettings } from '../../graphql/queries';
import { message } from 'antd';

// create app setting in Dynamo DB
export const createAppSettings = async (
  interests,
  ageSet,
  imageNumber,
  pictureSize,
  pictureEtensions
) => {
  const settingDetails = {
    minAge: ageSet[0],
    maxAge: ageSet[1],
    pictureCount: imageNumber,
    pictureSize: pictureSize,
    pictureExtension: pictureEtensions,
    intrests: interests,
  };
  try {
    const response = await API.graphql({
      query: updateHeavenlymatchUserAppSettings,
      variables: { input: settingDetails },
      authMode: 'API_KEY',
    });
    return response;
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const heavenlymatchUserAppSettings = async () => {
  try {
    const response = await API.graphql({
      query: listHeavenlymatchUserAppSettings,
      authMode: 'API_KEY',
    });
    const list = response.data.listHeavenlymatchUserAppSettings.items[0];
    const data = { ...list };
    return data;
  } catch (err) {
    message.error(err.message);
    throw new Error(err.errors[0].message);
  }
};
