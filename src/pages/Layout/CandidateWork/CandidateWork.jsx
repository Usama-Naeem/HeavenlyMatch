import React, { useState, useEffect } from 'react';
import Layout, { Content } from 'antd/es/layout/layout';
import { isMobileScreen } from '../../../utilities';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Form, Radio, ConfigProvider, Spin, message } from 'antd';
import { TravelToWorkSelectOption } from '../../../shared/enum/selectOptions';
import FormInput from '../../../shared/components/FormInput/FormInput';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import './CandidateWork.css';
import {
  getHeavenlyMatchUser,
  updateUser,
} from '../../../shared/api/candidates';
import { updateHeavenlymatchUsers } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import { FormRule } from '../../../enum/formRules';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';

const CandidateWork = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [travelRequirement, setTravelRequirement] = useState(true);
  const [working, setWorking] = useState(true);
  const mobileScreen = isMobileScreen();
  const [updatedValues, setUpdatedValues] = useState({});
  const [formDataChanged, setFormDataChanged] = useState(false);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const workStatus = (event) => {
    setWorking(event.target.value);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        setWorking(userData.currentlyWorking || false);
        setTravelRequirement(userData.requireTravel || false);
        setUpdatedValues(userData);
      }
    })();
  }, []);

  const travelStatus = (event) => {
    setTravelRequirement(event.target.value);
  };

  const handleFormSubmit = async (values) => {
    if (
      (values.currentlyWorking && values.designation) ||
      !values.currentlyWorking
    ) {
      setIsEditing(!isEditing);
      try {
        if (formDataChanged) {
          const editUser = {
            id: id,
            currentlyWorking: working,
            requireTravel: travelRequirement,
            travelForWork: values?.travelForWork,
            occupation: values?.occupation,
          };
          await updateUser(editUser, updateHeavenlymatchUsers);
          message.success(USER_UPDATED, [4]);
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
    currentlyWorking: updatedValues?.currentlyWorking,
    occupation: updatedValues?.occupation,
    requireTravel: updatedValues?.requireTravel,
    travelForWork: updatedValues?.travelForWork,
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
        <div
          id="candidateWork"
          className={`font-medium md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          <div className="flex justify-between mb-12 xl:ml-20  ">
            <h1 className=" font-medium font-sans text-xl ">Work</h1>
            {data !== null &&
              currentUserGroup?.includes(GroupType.SUPER_ADMIN) &&
              data?.moderationType !== candidateModerationTypes.NEWPROFILE && (
                <CandidateEditSaveButtons
                  width={mobileScreen ? 20 : 40}
                  isEditing={isEditing}
                  editStatus={editStatus}
                />
              )}
          </div>
          <div className="flex flex-col">
            {data !== null ? (
              <Form
                onFinish={handleFormSubmit}
                layout="vertical"
                className=" lg:gap-x-10 lg:gap-y-6 xl:ml-20 md:w-full"
                onValuesChange={() => setFormDataChanged(true)}
                initialValues={values}
              >
                <div className="flex flex-col">
                  <span className="mb-2">Are you currently working.</span>
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          colorPrimary: '#ffffff',
                        },
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={(e) => {
                        workStatus(e);
                        setFormDataChanged(true);
                      }}
                      value={working}
                      className="mb-10 radio-custom"
                      disabled={!isEditing}
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
                {working && (
                  <div className="mb-10">
                    <div>
                      <span className="text-red-500">* </span>
                      <span>What do you do?</span>
                      <FormInput
                        name="occupation"
                        placeholder="What do you do?"
                        type="text"
                        rules={FormRule.WORK}
                        className={`h-[40px] rounded-lg mt-1 ${
                          mobileScreen ? 'w-full' : 'lg:w-[290px]'
                        } `}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                )}
                {working && (
                  <div
                    className={`flex lg:gap-x-20 ${mobileScreen && 'flex-col'}`}
                  >
                    <div className="flex flex-col">
                      <span className="mb-2">
                        Does your job require travel.
                      </span>
                      <ConfigProvider
                        theme={{
                          components: {
                            Radio: {
                              colorPrimary: '#ffffff',
                            },
                          },
                        }}
                      >
                        <Radio.Group
                          onChange={(e) => {
                            travelStatus(e);
                            setFormDataChanged(true);
                          }}
                          value={travelRequirement}
                          className="mb-10"
                          disabled={!isEditing}
                        >
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                    {travelRequirement && (
                      <FormSelect
                        name="travelForWork"
                        label="How often do you travel for work?"
                        options={TravelToWorkSelectOption.TIMEFRAME}
                        className="w-[255px] lg:w-[300px] h-[40px] rounded-lg mb-10"
                        disabled={!isEditing}
                      />
                    )}
                  </div>
                )}
                <button id="submit" type="submit" className="hidden" />
              </Form>
            ) : (
              <Spin />
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CandidateWork;
