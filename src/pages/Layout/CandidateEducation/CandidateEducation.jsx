import React, { useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import { DegreeYouHaveEarned } from '../../../shared/enum/selectOptions';
import { isMobileScreen } from '../../../utilities';
import { DatePicker, Form, Spin, message } from 'antd';
import dayjs from 'dayjs';
import FormInput from '../../../shared/components/FormInput/FormInput';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import { updateHeavenlymatchUsers } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import {
  formatDate,
  getHeavenlyMatchUser,
  updateUser,
} from '../../../shared/api/candidates';
import { FormRule } from '../../../enum/formRules';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';

const CandidateEducation = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [graduationDate, setGraduationDate] = useState();
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        setGraduationDate(userData?.expectedCompletionDateDegree);
        setUpdatedValues(userData);
      }
    })();
  }, []);

  const handleFormSubmit = async (values) => {
    if (values.fieldOfStudy && values.schoolName) {
      setIsEditing(!isEditing);
      const date = formatDate(graduationDate);
      try {
        if (formDataChanged) {
          const editUser = {
            id: id,
            expectedCompletionDateDegree: date,
            education: values?.education,
            fieldOfStudy: values?.fieldOfStudy,
            schoolName: values?.schoolName,
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
    expectedCompletionDateDegree: updatedValues?.expectedCompletionDateDegree,
    education: updatedValues?.education,
    fieldOfStudy: updatedValues?.fieldOfStudy,
    schoolName: updatedValues?.schoolName,
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
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div
          id="candidateWork"
          className={`font-medium md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
            mobileScreen && 'mb-40'
          }`}
        >
          <div className="flex justify-between mb-12 xl:ml-20  ">
            <h1 className=" font-medium font-sans text-xl ">Education</h1>
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
                <div
                  className={`flex lg:gap-x-20 ${
                    mobileScreen ? 'flex-col' : ''
                  }`}
                >
                  <FormSelect
                    name="education"
                    label="What is the highest degree you have earned."
                    options={DegreeYouHaveEarned.EDUCATIONLEVEL}
                    placeholder="Select Degree"
                    disabled={!isEditing}
                  />
                  <div>
                    <span className="text-red-500">* </span>
                    <span>What's your field of study? </span>
                    <FormInput
                      name="fieldOfStudy"
                      type="text"
                      placeholder="Field of study."
                      className={`${
                        mobileScreen ? 'w-full' : 'lg:w-[290px]'
                      } h-[40px] rounded-lg mt-2`}
                      disabled={!isEditing}
                      rules={[
                        {
                          pattern: new RegExp('^[a-zA-Z ]{0,30}$'),
                          message:
                            'Should only contain alphabetical characters.',
                        },
                      ]}
                    />
                  </div>
                </div>
                <div
                  className={`flex lg:gap-x-20 mt-1 ${
                    mobileScreen ? 'flex-col' : ''
                  }`}
                >
                  <div
                    className={`flex lg:gap-x-20 ${mobileScreen && 'flex-col'}`}
                  >
                    <div className="flex flex-col">
                      <div>
                        <span className="text-red-500">* </span>
                        <span>What school are you attending or have </span>
                      </div>
                      <span className="mb-1">graduated from?</span>

                      <FormInput
                        name="schoolName"
                        type="text"
                        placeholder="Enter School Name"
                        className={`${
                          mobileScreen ? 'w-full' : 'lg:w-[280px]'
                        } h-[40px] rounded-lg mt-2`}
                        disabled={!isEditing}
                        rules={FormRule.EDUCATION}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col  ">
                    <span className={!mobileScreen ? `mb-[30px]` : 'mb-1'}>
                      When did you graduate or will be graduating?
                    </span>
                    <DatePicker
                      name="expectedCompletionDateDegree"
                      className={`${
                        mobileScreen ? 'w-full' : 'lg:w-[290px]'
                      } h-[40px] rounded-lg mt-2`}
                      disabled={!isEditing}
                      onChange={(e) => {
                        setGraduationDate(e);
                        setFormDataChanged(true);
                      }}
                      defaultValue={
                        graduationDate
                          ? dayjs(graduationDate, 'YYYY-MM-DD')
                          : ''
                      }
                      format="MM-DD-YYYY"
                    />
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

export default CandidateEducation;
