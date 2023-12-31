import React, { useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import {
  SectYouBelongTo,
  PrayersYouOffer,
  WisitToMosqueReligiosCenter,
} from '../../../shared/enum/selectOptions';
import { ConfigProvider, Form, Radio, Spin, message } from 'antd';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import {
  getHeavenlyMatchUser,
  updateUser,
} from '../../../shared/api/candidates';
import { updateHeavenlymatchUsers } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { isMobileScreen } from '../../../utilities';
import { GenderType, GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';

const CandidateRelegion = () => {
  const mobileScreen = isMobileScreen();
  const [isEditing, setIsEditing] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [hajjCheck, setHajjCheck] = useState(true);
  const [bearedCheck, setBeardCheck] = useState(true);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [updatedValues, setUpdatedValues] = useState({});
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        setBeardCheck(userData.hijabBeard || false);
        setHajjCheck(userData.hajj || false);
        setUpdatedValues(userData);
      }
    })();
  }, []);

  const beardStatus = (event) => {
    setBeardCheck(event.target.value);
  };

  const hajjStatus = (event) => {
    setHajjCheck(event.target.value);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (formDataChanged) {
        const editUser = {
          id: id,
          sect: values.sect,
          pray: values.pray,
          gotoMosque: values.gotoMosque,
          hijabBeard: bearedCheck,
          hajj: hajjCheck,
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
    sect: updatedValues.sect,
    pray: updatedValues.pray,
    gotoMosque: updatedValues.gotoMosque,
    hijabBeard: updatedValues.hijabBeard,
    hajj: updatedValues.hajj,
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
          <div className="flex justify-between mb-12 xl:ml-20  ">
            <h1 className=" font-medium font-sans text-xl ">Religion</h1>
            {data !== null &&
              currentUserGroup?.includes(GroupType.SUPER_ADMIN) &&
              data.moderationType !== candidateModerationTypes.NEWPROFILE && (
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
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="sect"
                      label="What sect do you belong to?"
                      options={SectYouBelongTo.SECTS}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="pray"
                      label="How often do you pray?"
                      options={PrayersYouOffer.PRAYERCOUNT}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className={`flex lg:gap-x-20 mt-5 flex-wrap`}>
                  <div
                    className={`${mobileScreen ? 'w-full' : 'lg:w-[290px]'}   `}
                  >
                    <FormSelect
                      name="gotoMosque"
                      label="How often do you go to a mosque or religious center?"
                      options={WisitToMosqueReligiosCenter.VISITS}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className={`flex lg:gap-x-20 mt-5 flex-wrap`}>
                  <div className="flex flex-col">
                    {data?.gender === GenderType.MALE ? (
                      <span className="mb-3">Do you have beard?</span>
                    ) : (
                      <span className="mb-3">Do you wear hijab?</span>
                    )}
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
                          beardStatus(e);
                          setFormDataChanged(true);
                        }}
                        value={bearedCheck}
                        className="mb-10 w-[290px]"
                        disabled={!isEditing}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-3">Have you performed Hajj?</span>
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
                          hajjStatus(e);
                          setFormDataChanged(true);
                        }}
                        value={hajjCheck}
                        className="mb-10 lg:w-[290px]"
                        disabled={!isEditing}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </ConfigProvider>
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

export default CandidateRelegion;
