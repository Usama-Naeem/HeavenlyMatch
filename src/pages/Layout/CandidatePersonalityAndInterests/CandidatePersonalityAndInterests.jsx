import React, { useState, useEffect } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Select, Spin, message } from 'antd';
import {
  getHeavenlyMatchUser,
  updateUser,
} from '../../../shared/api/candidates';
import { updateHeavenlymatchUsers } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { isMobileScreen } from '../../../utilities';
import { heavenlymatchUserAppSettings } from '../../../shared/api/appSettings';
import { GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';

const CandidatePersonalityAndInterests = () => {
  const mobileScreen = isMobileScreen();
  const [isEditing, setIsEditing] = useState(false);
  const [interests, setInterests] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [interestValue, setInterestValue] = useState([]);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [updatedValues, setUpdatedValues] = useState({});
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        const appSetting = await heavenlymatchUserAppSettings();
        // current user interests
        if (userData.personality) {
          setUserInterests(JSON.parse(userData.personality));
          const tempItemName = [];
          JSON.parse(userData.personality).forEach((item) => {
            tempItemName.push(item.value);
          });
          setInterestValue(tempItemName);
        }
        // interest fetch from app settings
        setInterests(JSON.parse(appSetting.intrests));
        setUpdatedValues(userData);
      }
    })();
  }, []);

  const selectInterest = (value) => {
    let tempInterests = [...userInterests];
    const response = interests.filter((item) => item.value == value);
    tempInterests.push(response[0]);
    setUserInterests(tempInterests);
    const tempInterestValue = [...interestValue];
    tempInterestValue.push(value);
    setInterestValue(tempInterestValue);
  };

  const removeInterest = (value) => {
    let filteredInterests = userInterests.filter((item) => item.value != value);
    setUserInterests(filteredInterests);
    const tempInterestValue = interestValue.filter((item) => item != value);
    setInterestValue(tempInterestValue);
    setFormDataChanged(true);
  };

  const handleFormSubmit = async () => {
    if (interests.length > 0) {
      try {
        if (formDataChanged) {
          const editUser = {
            id: id,
            personality: JSON.stringify(userInterests),
          };
          await updateUser(editUser, updateHeavenlymatchUsers);
          message.success(USER_UPDATED, [4]);
          setIsEditing(!isEditing);
          setFormDataChanged(false);
        } else {
          message.warning(FORM_DETAILS_ARE_NOT_CHANGED, [4]);
        }
      } catch (err) {
        message.error(err.message, [4]);
        throw new Error(err.message);
      }
    }
  };
  const values = {
    personality: updatedValues?.personality,
  };
  const editStatus = (status) => {
    if (status) {
      setIsEditing(status);
    }
    if (!status) {
      document.getElementById('submit').click();
    }
  };
  return (
    <Layout>
      {data !== null && <CandidateAboutMeHeader data={data} />}
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div className="flex">
          <div
            id="candidateWork"
            className="font-medium w-full h-full bg-white rounded-3xl lg:p-12 p-4"
          >
            <div className="flex justify-between mb-12 xl:ml-20  ">
              <h1 className=" font-medium font-sans text-xl ">
                Personality and Interests
              </h1>
              {data !== null &&
                currentUserGroup?.includes(GroupType.SUPER_ADMIN) &&
                data?.moderationType !==
                  candidateModerationTypes.NEWPROFILE && (
                  <CandidateEditSaveButtons
                    width={mobileScreen ? 20 : 40}
                    isEditing={isEditing}
                    editStatus={editStatus}
                  />
                )}
            </div>
            <div className=" lg:gap-x-10 lg:gap-y-6 xl:ml-20  md:w-full">
              <div className="flex flex-col">
                {data !== null ? (
                  <Form
                    onFinish={handleFormSubmit}
                    layout="vertical"
                    className=" lg:gap-x-10 lg:gap-y-6 md:w-full"
                    onValuesChange={() => setFormDataChanged(true)}
                    initialValues={values}
                  >
                    <div className={`inline-flex flex-col w-full`}>
                      <div className="mb-3">
                        <span className="text-red-500">* </span>
                        <span>Personality and Interests</span>
                      </div>
                      <div>
                        <Select
                          size="large"
                          options={interests.filter(
                            (item) => !interestValue.includes(item.value)
                          )}
                          className={`${
                            mobileScreen ? 'w-full' : 'lg:w-[290px]'
                          }   `}
                          onChange={(e) => {
                            selectInterest(e);
                            setFormDataChanged(true);
                          }}
                          disabled={!isEditing}
                          value={'Choose interests'}
                        />
                      </div>
                      {userInterests.length === 0 && (
                        <span className="text-red-500">Required field</span>
                      )}
                    </div>
                    <button id="submit" type="submit" className="hidden" />
                  </Form>
                ) : (
                  <Spin />
                )}
              </div>
              <div className="flex flex-wrap mt-6 align-top">
                {userInterests?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="mr-5 bg-slate-100 border-stone-200 pt-0 pb-0 rounded-md pl-2 pr-2 flex mb-2 border-2"
                    >
                      <img
                        src={item.icon}
                        alt="dummyicon"
                        className="w-3 h-3 mr-1 self-center"
                      />
                      <span className="mr-1 self-center">{item.value}</span>
                      {isEditing && (
                        <CloseOutlined
                          style={{
                            alignSelf: 'center',
                            fontSize: '10px',
                            color: '#484747',
                          }}
                          onClick={() => removeInterest(item.value)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CandidatePersonalityAndInterests;
