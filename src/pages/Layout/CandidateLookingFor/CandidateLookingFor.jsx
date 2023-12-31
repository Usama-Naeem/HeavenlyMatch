import React, { useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import {
  EthnicitySelectOptions,
  DegreeYouHaveEarned,
} from '../../../shared/enum/selectOptions';
import { ConfigProvider, Form, Radio, Slider, Spin, message } from 'antd';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import { updateUser } from '../../../shared/api/teamMember';
import { updateHeavenlymatchUserLookingFor } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { isMobileScreen } from '../../../utilities';
import { GenderType, GroupType, candidateModerationTypes } from '../../../enum';
import { useParams } from 'react-router-dom';
import {
  getHeavenlyMatchLookingFors,
  getHeavenlyMatchUser,
} from '../../../shared/api/candidates';
import { heavenlymatchUserAppSettings } from '../../../shared/api/appSettings';

const CandidateLookingFor = () => {
  const mobileScreen = isMobileScreen();
  const [isEditing, setIsEditing] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [ageLimit, setAgeLimit] = useState(false);
  const [minRange, setMinRange] = useState(18);
  const [maxRange, setMaxRange] = useState(75);
  const [hijabCheck, setHijabCHeck] = useState(true);
  const [halalCheck, setHalalCheck] = useState(true);
  const [prayerCheck, setPrayerCheck] = useState(true);
  const [ageSet, setAgeSet] = useState([18, 24]);
  const [updatedValues, setUpdatedValues] = useState({});
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      if (id) {
        const appSetting = await heavenlymatchUserAppSettings();
        setMinRange(appSetting.minAge);
        setMaxRange(appSetting.maxAge);
        setAgeLimit([appSetting?.minAge, appSetting?.maxAge]);
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        const getData = await getHeavenlyMatchLookingFors(
          userData?.userLookingFor?.id
        );
        setHijabCHeck((getData && getData.hijabBeard) || false);
        setHalalCheck((getData && getData.consumeHalal) || false);
        setPrayerCheck((getData && getData.pray) || false);
        setAgeSet(
          (getData && JSON.parse(getData?.age)) || [
            appSetting?.minAge,
            appSetting?.maxAge,
          ]
        );
        setUpdatedValues(getData);
      }
      setLoader(false);
    })();
  }, []);

  const setAgeRange = (range) => {
    setAgeSet(range);
  };

  const hijabStatus = (status) => {
    setHijabCHeck(status.target.value);
  };

  const halalStatus = (status) => {
    setHalalCheck(status.target.value);
  };

  const prayerStatus = (status) => {
    setPrayerCheck(status.target.value);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (formDataChanged) {
        const editUser = {
          id: data?.userLookingFor?.id,
          age: ageSet,
          ethnicity: values.ethnicity,
          education: values.education,
          hijabBeard: hijabCheck,
          consumeHalal: halalCheck,
          pray: prayerCheck,
        };
        if (editUser?.age[0] < ageLimit[0] || editUser?.age[1] > ageLimit[1]) {
          message.error(
            `The age must be between ${ageLimit[0]} and ${ageLimit[1]}. Please ensure that your age falls within this range to proceed.`,
            [3]
          );
          return;
        }
        await updateUser(editUser, updateHeavenlymatchUserLookingFor);
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
    // age: updatedValues.age,
    ethnicity: updatedValues?.ethnicity,
    education: updatedValues?.education,
    hijabBeard: updatedValues?.hijabBeard,
    consumeHalal: updatedValues?.consumeHalal,
    pray: updatedValues?.pray,
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
          className="font-medium md:w-full md:h-full bg-white rounded-3xl pt-12 pl-5 pr-5 pb-12"
        >
          <div className="flex justify-between mb-12 xl:ml-12  ">
            <h1 className=" font-medium font-sans text-xl ">
              Whom I'm Looking For
            </h1>
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
          <div className="flex items-center justify-center flex-col">
            {!loader ? (
              <Form
                onFinish={handleFormSubmit}
                layout="vertical"
                className=" lg:gap-x-10 lg:gap-y-6 xl:ml-12  md:w-full"
                onValuesChange={() => setFormDataChanged(true)}
                initialValues={values}
              >
                <div className={`flex lg:gap-x-20 flex-wrap`}>
                  <div className="flex flex-wrap lg:gap-x-10 mb-8">
                    <div
                      className={`${
                        mobileScreen
                          ? 'w-[290px] mb-14'
                          : 'w-[255px] lg:w-[290px]'
                      } h-[40px] `}
                    >
                      <span>Set minimum and maximum age range.</span>

                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: '#CC5869',
                          },
                        }}
                      >
                        <Slider
                          range
                          min={minRange}
                          max={maxRange}
                          // tooltipVisible
                          // tooltipPlacement="top"
                          onChange={(e) => {
                            setAgeRange(e);
                            setFormDataChanged(true);
                          }}
                          value={ageSet}
                          className="mt-8"
                          disabled={!isEditing}
                        />
                      </ConfigProvider>
                      <div className="flex justify-between">
                        <div>
                          <span className="text-xs">Min Age:</span>
                          <span className="text-[#CC5869]">{ageSet[0]}</span>
                        </div>
                        <div>
                          <span className="text-xs">Max Age:</span>
                          <span className="text-[#CC5869]">{ageSet[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[290px]">
                    <div className="flex flex-col">
                      <span className={!mobileScreen ? `mb-8` : 'mb-2'}>
                        What specific ethnicity you are looking for?
                      </span>
                      <FormSelect
                        name="ethnicity"
                        options={EthnicitySelectOptions.ETHNICITY}
                        placeholder="Select your answer"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="w-[290px]">
                    <FormSelect
                      name="education"
                      label="What minimum education level you are looking for?"
                      options={DegreeYouHaveEarned.EDUCATIONLEVEL}
                      placeholder="Select your answer"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div
                  className={`flex lg:gap-x-20 flex-wrap ${
                    mobileScreen ? 'mt-1' : 'mt-6'
                  }`}
                >
                  <div className="flex flex-col w-[290px]">
                    {data?.gender === GenderType.MALE ? (
                      <span className="mb-3">
                        Is observing the hijab necessary for your ideal match?
                      </span>
                    ) : (
                      <span className="mb-3">
                        Is observing beard requirement for your ideal match?
                      </span>
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
                          hijabStatus(e);
                          setFormDataChanged(true);
                        }}
                        value={hijabCheck}
                        className="mb-10 lg:w-[290px]"
                        disabled={!isEditing}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </ConfigProvider>
                  </div>
                  <div className="w-[290px]">
                    <div className="flex flex-col w-[290px]">
                      <span className="mb-3">
                        Is it necessary to use only halal for your ideal match?
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
                            halalStatus(e);
                            setFormDataChanged(true);
                          }}
                          value={halalCheck}
                          className="mb-10 lg:w-[290px]"
                          disabled={!isEditing}
                        >
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                  </div>
                  <div className="w-[290px]">
                    <div className="flex flex-col w-[290px]">
                      <span className="mb-3">
                        Is praying every day a requirement of your ideal match?
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
                            prayerStatus(e);
                            setFormDataChanged(true);
                          }}
                          value={prayerCheck}
                          className="mb-10 lg:w-[290px]"
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

export default CandidateLookingFor;