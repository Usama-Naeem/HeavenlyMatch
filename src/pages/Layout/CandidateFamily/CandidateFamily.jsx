import React, { useEffect, useState } from 'react';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { isMobileScreen } from '../../../utilities';
import Layout from 'antd/es/layout/layout';
import { Content } from 'antd/es/layout/layout';
import { ConfigProvider, Form, Radio, Spin, message } from 'antd';
import FormInput from '../../../shared/components/FormInput/FormInput';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import {
  getHeavenlyMatchUser,
  updateUser,
} from '../../../shared/api/candidates';
import { updateHeavenlymatchUsers } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import { FormRule } from '../../../enum/formRules';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import { Siblings } from '../../../shared/enum/selectOptions';
import { GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';

const CandidateFamily = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [syedCheck, setsyedCheck] = useState(true);
  const [data, setData] = useState(null);
  const [siblingsCheck, setSiblingsCheck] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [updatedValues, setUpdatedValues] = useState({
    fatherName: '',
    motherName: '',
    brothersCount: '',
    sistersCount: '',
    syed: '',
    haveSiblings: '',
  });
  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        setsyedCheck(userData.syed || false);
        setSiblingsCheck(userData.haveSiblings || false);
        setUpdatedValues(userData);
      }
    })();
  }, []);

  const syedStatus = (event) => {
    setsyedCheck(event.target.value);
  };

  const siblingsStatus = (event) => {
    setSiblingsCheck(event.target.value);
  };

  const handleFormSubmit = async ({
    fatherName,
    motherName,
    brothersCount,
    sistersCount,
  }) => {
    setIsEditing(!isEditing);
    try {
      if (formDataChanged) {
        const editUser = {
          id,
          fatherName,
          motherName,
          brothersCount,
          sistersCount,
          syed: syedCheck,
          haveSiblings: siblingsCheck,
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
  const {
    fatherName,
    motherName,
    brothersCount,
    sistersCount,
    haveSiblings,
    syed,
  } = updatedValues;
  const values = {
    fatherName,
    motherName,
    brothersCount,
    sistersCount,
    haveSiblings,
    syed,
  };
  const editStatus = (status) => {
    if (status) {
      setIsEditing(status);
    }
    if (!status) {
      document.getElementById('submit').click();
    }
  };
  const mobileScreen = isMobileScreen();
  return (
    <Layout>
      {data !== null && <CandidateAboutMeHeader data={data} />}
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-40'} `}>
        <div
          id="candidateWork"
          className={`font-medium md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          <div className="flex justify-between mb-12 xl:ml-20  ">
            <h1 className=" font-medium font-sans text-xl ">Family</h1>
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
                initialValues={values}
                onValuesChange={() => setFormDataChanged(true)}
              >
                <div
                  className={`flex lg:gap-x-20 ${
                    mobileScreen ? 'flex-col' : ''
                  }`}
                >
                  <FormInput
                    name="fatherName"
                    label="What's your father name?"
                    type="text"
                    placeholder="Enter Name."
                    className={`${
                      mobileScreen ? 'w-full' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg`}
                    disabled={!isEditing}
                    rules={[
                      {
                        pattern: new RegExp('^[a-zA-Z ]{0,30}$'),
                        message:
                          'Name should only contain alphabetical characters.',
                      },
                    ]}
                  />
                  <FormInput
                    name="motherName"
                    label="What's your mother name?"
                    type="text"
                    placeholder="Enter Name."
                    className={`${
                      mobileScreen ? 'w-full' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg`}
                    disabled={!isEditing}
                    rules={[
                      {
                        pattern: new RegExp('^[a-zA-Z ]{0,30}$'),
                        message:
                          'Name should only contain alphabetical characters.',
                      },
                    ]}
                  />
                </div>
                <div
                  className={`flex lg:gap-x-20  ${
                    mobileScreen ? 'flex-col' : siblingsCheck ? 'flex-col' : ''
                  }`}
                >
                  {/* disable this div if user select no in do you have siblings  */}
                  <div className={`flex lg:gap-x-20 mt-2 flex-wrap `}>
                    <div className="flex flex-col">
                      <span className="mb-3">Do you have siblings?</span>
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
                            siblingsStatus(e);
                            setFormDataChanged(true);
                          }}
                          value={siblingsCheck}
                          className="mb-5 lg:w-[290px]"
                          disabled={!isEditing}
                        >
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                    <div className={mobileScreen && `mb-5`}>
                      {siblingsCheck && (
                        <>
                          <span>How many siblings do you have?</span>
                          <div
                            className={`flex mt-2 ${
                              mobileScreen && 'w-full justify-between gap-6'
                            }`}
                          >
                            <div className=" w-[50%]">
                              <span className="text-red-500">* </span>
                              <span>Brothers </span>
                              <div
                                className={`${
                                  mobileScreen ? 'w-full' : 'lg:w-[130px]'
                                } h-[40px] rounded-lg  mr-10`}
                              >
                                <FormSelect
                                  name="brothersCount"
                                  options={Siblings.COUNT}
                                  placeholder="Brother (s)"
                                  disabled={!isEditing}
                                  rules={FormRule.SIBLINGS}
                                />
                              </div>
                            </div>
                            <div className=" w-[50%]">
                              <span className="text-red-500">* </span>
                              <span>Sisters </span>
                              <div
                                className={`${
                                  mobileScreen ? 'w-full' : 'lg:w-[130px]'
                                } h-[40px] rounded-lg  mr-10`}
                              >
                                <FormSelect
                                  name="sistersCount"
                                  options={Siblings.COUNT}
                                  placeholder="Sister (s)"
                                  disabled={!isEditing}
                                  rules={FormRule.SIBLINGS}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex lg:gap-x-20 ${mobileScreen && 'flex-col'}`}
                  >
                    <div className="flex flex-col">
                      <span className="mb-3">Are you Syed?.</span>
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
                            syedStatus(e);
                            setFormDataChanged(true);
                          }}
                          value={syedCheck}
                          className="mb-20"
                          disabled={!isEditing}
                        >
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
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

export default CandidateFamily;
