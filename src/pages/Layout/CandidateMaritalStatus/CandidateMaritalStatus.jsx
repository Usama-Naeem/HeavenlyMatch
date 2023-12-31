import React, { useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import { MaritalStatus } from '../../../shared/enum/selectOptions';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import { Form, Spin, message } from 'antd';
import {
  getHeavenlyMatchUser,
  updateUser,
} from '../../../shared/api/candidates';
import { updateHeavenlymatchUsers } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { isMobileScreen } from '../../../utilities';
import { GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';

const CandidateMaritalStatus = () => {
  const mobileScreen = isMobileScreen();
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        setUpdatedValues(userData);
      }
    })();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      if (formDataChanged) {
        const editUser = {
          id: id,
          maritalStatus: values?.maritalStatus,
        };
        await updateUser(editUser, updateHeavenlymatchUsers);
        message.success(USER_UPDATED, [4]);
      } else {
        message.warning(FORM_DETAILS_ARE_NOT_CHANGED, [4]);
      }
    } catch (err) {
      message.error(err.message, [4]);
      throw new Error(err.message);
    }
  };
  const values = {
    maritalStatus: updatedValues?.maritalStatus,
  };
  const editStatus = (status) => {
    setIsEditing(status);
    if (!status) {
      document.getElementById('submit').click();
    }
  };

  return (
    <Layout>
      {data !== null && <CandidateAboutMeHeader data={data} />}
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5'} `}>
        <div
          id="candidateWork"
          className={`font-medium md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          <div className="flex justify-between mb-12 xl:ml-20  ">
            <h1 className=" font-medium font-sans text-xl ">Marital Status</h1>
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
                <div className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'} `}>
                  <FormSelect
                    name="maritalStatus"
                    label="Have you been married before."
                    options={MaritalStatus.STATUS}
                    placeholder="Select your marital status."
                    disabled={!isEditing}
                  />
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
export default CandidateMaritalStatus;
