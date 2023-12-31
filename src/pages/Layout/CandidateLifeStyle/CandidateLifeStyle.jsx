import React, { useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import {
  HangOutWithFriends,
  CookFood,
  WatchTv,
  PlayVideoGames,
  PlaySports,
  DoYouSmoke,
} from '../../../shared/enum/selectOptions';
import { Form, Spin, message } from 'antd';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
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

const CandidateLifeStyle = () => {
  const mobileScreen = isMobileScreen();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const [formDataChanged, setFormDataChanged] = useState(false);
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
          hangoutFriends: values.hangoutFriends,
          doCooking: values.doCooking,
          watchingTv: values.watchingTv,
          playVideoGames: values.playVideoGames,
          exercise: values.exercise,
          smoking: values.smoking,
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
    hangoutFriends: updatedValues?.hangoutFriends,
    doCooking: updatedValues?.doCooking,
    watchingTv: updatedValues?.watchingTv,
    playVideoGames: updatedValues?.playVideoGames,
    exercise: updatedValues?.exercise,
    smoking: updatedValues?.smoking,
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
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div
          id="candidateWork"
          className={`font-medium md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          <div className="flex justify-between mb-12 xl:ml-5  ">
            <h1 className=" font-medium font-sans text-xl ">Life Style</h1>
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
                className=" lg:gap-x-10 lg:gap-y-6 xl:ml-5  md:w-full"
                onValuesChange={() => setFormDataChanged(true)}
                initialValues={values}
              >
                <div className={`flex lg:gap-x-10 flex-wrap`}>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="hangoutFriends"
                      label="How often do you hang out with friends?"
                      options={HangOutWithFriends.HANGOUT}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="doCooking"
                      label="How often do you cook?"
                      options={CookFood.COOK}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="watchingTv"
                      label="How often do you watch TV?"
                      options={WatchTv.TV}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className={`flex lg:gap-x-10 flex-wrap `}>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="playVideoGames"
                      label="How often do you play video games?"
                      options={PlayVideoGames.VIDEOGAMES}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="exercise"
                      label="How often do you exercise or play sports?"
                      options={PlaySports.SPORTS}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="smoking"
                      label="Do you smoke?"
                      options={DoYouSmoke.SMOKE}
                      placeholder="Select your answer"
                      disabled={!isEditing}
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

export default CandidateLifeStyle;
