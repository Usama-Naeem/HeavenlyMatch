import React, { useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import { YouAreLivingWith } from '../../../shared/enum/selectOptions';
import { ConfigProvider, Form, Radio, Spin, message } from 'antd';
import FormInput from '../../../shared/components/FormInput/FormInput';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import { USER_UPDATED } from '../../../shared/constant/success';
import {
  getHeavenlyMatchUser,
  updateUser,
} from '../../../shared/api/candidates';
import { updateHeavenlymatchUsers } from '../../../graphql/mutations';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { isMobileScreen } from '../../../utilities';
import { GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';

const CandidateLiving = () => {
  const mobileScreen = isMobileScreen();
  const [isEditing, setIsEditing] = useState(false);
  const [dependentsCheck, setDependentsCheck] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [relocateCheck, setRelocateCheck] = useState(true);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [data, setData] = useState(null);
  const [updatedValues, setUpdatedValues] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        setDependentsCheck(userData.haveDependents || false);
        setRelocateCheck(userData.relocate || false);
        setUpdatedValues(userData);
      }
    })();
  }, []);

  const relocateStatus = (event) => {
    setRelocateCheck(event.target.value);
  };

  const dependentsStatus = (event) => {
    setDependentsCheck(event.target.value);
  };

  const handleFormSubmit = async (values) => {
    try {
      setIsEditing(!isEditing);
      if (formDataChanged) {
        const editUser = {
          id: id,
          livingWith: values?.livingWith,
          haveDependents: dependentsCheck,
          noDependent: dependentsCheck ? values?.noDependent : null,
          relocate: relocateCheck,
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
  };
  const values = {
    livingWith: updatedValues?.livingWith,
    noDependent: updatedValues?.noDependent,
    haveDependents: updatedValues?.haveDependents,
    relocate: updatedValues?.relocate,
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
            <h1 className=" font-medium font-sans text-xl ">Living</h1>
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
                className=" lg:gap-x-10 lg:gap-y-6 xl:ml-20  md:w-full"
                onValuesChange={() => setFormDataChanged(true)}
                initialValues={values}
              >
                <div className={`flex lg:gap-x-20 flex-wrap`}>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'} `}
                  >
                    <FormSelect
                      name="livingWith"
                      label="Who are you living with?"
                      options={YouAreLivingWith.LIVINGWITH}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-3">Are you willing to relocate?</span>
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
                          relocateStatus(e);
                          setFormDataChanged(true);
                        }}
                        value={relocateCheck}
                        className="mb-5"
                        disabled={!isEditing}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                </div>
                <div className={`flex lg:gap-x-20 mt-2 flex-wrap `}>
                  <div className="flex flex-col">
                    <span className="mb-3">Do you have any dependents?</span>
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
                          dependentsStatus(e);
                          setFormDataChanged(true);
                        }}
                        value={dependentsCheck}
                        className="mb-5 lg:w-[290px]"
                        disabled={!isEditing}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                  <div className={`flex lg:gap-x-20 flex-wrap w-full `}>
                    {dependentsCheck && (
                      <div className="w-full">
                        <span className="text-red-500">* </span>
                        <span>How many dependents you have?</span>
                        <FormInput
                          name="noDependent"
                          type="text"
                          placeholder="Enter the number of dependents."
                          className={`h-[40px] rounded-lg mt-1 ${
                            mobileScreen ? 'w-full' : 'lg:w-[290px]'
                          } `}
                          disabled={!isEditing}
                          rules={[
                            {
                              pattern: new RegExp('^[1-9][0-9]?$'),
                              message: 'Invalid input.',
                            },
                            {
                              required: true,
                              message: 'Required Field',
                            },
                          ]}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button id="submit" className="hidden"></button>
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

export default CandidateLiving;
