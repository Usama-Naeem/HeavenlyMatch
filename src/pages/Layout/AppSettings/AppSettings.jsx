import { ConfigProvider, Input, Layout, Select, Slider, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import { CloseOutlined } from '@ant-design/icons';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import {
  ImageFormats,
  ImageQuantity,
} from '../../../shared/enum/selectOptions';
import { isMobileScreen } from '../../../utilities';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { heavenlymatchUserAppSettings } from '../../../shared/api/appSettings';
import { updateUser } from '../../../shared/api/teamMember';
import { updateHeavenlymatchUserAppSettings } from '../../../graphql/mutations';
const { Content } = Layout;

const AppSettings = () => {
  const mobileScreen = isMobileScreen();
  const [isEditing, setIsEditing] = useState(false);
  const [minRange, setMinRange] = useState(18);
  const [maxRange, setMaxRange] = useState(75);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [singleInterest, setSingleInterest] = useState('');

  // data stoage states
  const [ageSet, setAgeSet] = useState([18, 28]);
  const [interests, setInterests] = useState([]);
  const [imageNumber, setImageNumber] = useState(5);
  const [pictureSize, setPictureSize] = useState(50);
  const [pictureEtensions, setPictureEtensions] = useState();
  const [previousStates, setPreviousStates] = useState({});
  const [selectedIcon, setSelectedIcon] = useState({});
  const [key, setKey] = useState(null);

  useEffect(() => {
    (async () => {
      const getData = await heavenlymatchUserAppSettings();
      setKey(getData.id);
      setInterests(JSON.parse(getData.intrests));
      setAgeSet([getData.minAge, getData.maxAge]);
      setImageNumber(getData.pictureCount);
      setPictureSize(getData.pictureSize);
      setPictureEtensions(JSON.parse(getData.pictureExtension));
    })();
  }, []);

  const editStatus = (status) => {
    if (status) {
      setPreviousStates({
        ageSet: ageSet,
        interests: interests,
        imageNumber: imageNumber,
        pictureEtensions: pictureEtensions,
        pictureSize: pictureSize,
      });
      setIsEditing(status);
    }
    if (!status) {
      handleFormSubmit();
    }
  };

  const undoChanges = () => {
    setAgeSet(previousStates.ageSet);
    setInterests(previousStates.interests);
    setImageNumber(previousStates.imageNumber);
    setPictureEtensions(previousStates.pictureEtensions);
    setPictureSize(previousStates.pictureSize);
    setIsEditing(false);
  };

  const setAgeRange = (range) => {
    setAgeSet(range);
  };

  const removeInterest = (value) => {
    let filteredInterests = interests.filter((item) => item != value);
    setInterests(filteredInterests);
  };

  const handleFormSubmit = async () => {
    // update app settings
    try {
      const editUser = {
        id: key,
        intrests: JSON.stringify(interests),
        minAge: ageSet[0],
        maxAge: ageSet[1],
        pictureCount: imageNumber,
        pictureSize: pictureSize,
        pictureExtension: JSON.stringify(pictureEtensions),
      };
      if (interests?.length < 1) {
        message.error(
          'You must add at least one interest to save the settings.'
        );
        return;
      }
      if (pictureEtensions?.length < 1) {
        message.error(
          'You must add at least one picture extension to save the settings.'
        );
        return;
      }
      await updateUser(editUser, updateHeavenlymatchUserAppSettings);
      setIsEditing(false);
      message.success('App Settings are saved successfully', [4]);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const marks = {
    0: '1mb',
    20: '2mb',
    40: '4mb',
    60: '6mb',
    80: '8mb',
    100: '10mb',
  };

  const Capitalize = (value) => {
    const data = value.split(' ');
    const capital = data.map((item) =>
      item.charAt(0).toUpperCase().concat(item.slice(1))
    );
    return capital.join(' ');
  };

  const handleInterests = (e) => {
    setSingleInterest(e.target.value);
  };

  const saveInterests = () => {
    if (singleInterest) {
      const tempInterests = [...interests];
      tempInterests.push({
        label: Capitalize(singleInterest),
        value: singleInterest,
        ...selectedIcon,
      });
      setInterests(tempInterests);
      setSingleInterest('');
    }
  };

  const iconSelected = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <Layout>
      <Header content="App Settings" />
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div
          id="navDiv"
          className={`w-[100%] h-full bg-white rounded-3xllg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          <div className="flex justify-between items-start mb-2 xl:ml-8 mt-8 mr-5">
            <h1 className=" font-medium font-sans text-xl ">
              Other Information
            </h1>
            <div className="flex gap-5 ml-2">
              <CandidateEditSaveButtons
                width={mobileScreen ? 14 : 40}
                isEditing={isEditing}
                editStatus={editStatus}
                appSetting={true}
              />
              {isEditing && (
                <button
                  className="border-2 border-slate-200 rounded-full pl-2 pr-2 "
                  onClick={undoChanges}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          <div className="flex  flex-col ">
            <div
              layout="vertical"
              className=" lg:gap-x-10 lg:gap-y-6 xl:ml-8  md:w-full"
            >
              <div className="flex flex-wrap lg:gap-x-10 ">
                <div
                  className={`${
                    mobileScreen ? 'w-full mb-14' : 'w-[255px] lg:w-[290px]'
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
                      className="mt-4"
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
              <div className="flex flex-wrap mt-4 lg:gap-x-10">
                <div
                  className={`${
                    mobileScreen
                      ? 'w-full mb-14'
                      : 'w-[255px] lg:w-[290px] mt-16'
                  } h-[40px] `}
                >
                  <span>Maximum Number of Pictures</span>
                  <div>
                    <Select
                      size="large"
                      name="pictureCount"
                      label="Picture Count"
                      options={ImageQuantity.QUANTITY}
                      disabled={!isEditing}
                      className={`h-[40px] rounded-lg mt-1 ${
                        mobileScreen ? 'w-full' : 'lg:w-[290px]'
                      } `}
                      onChange={(e) => setImageNumber(e)}
                      value={imageNumber}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col  ${
                    mobileScreen ? 'w-full ' : 'mt-16'
                  }`}
                >
                  <span>Each Picture Size </span>
                  {!isEditing ? (
                    <Input
                      name="pictureSize"
                      type="text"
                      placeholder="Enter Picture Size"
                      className={`h-[40px] rounded-lg mt-1 ${
                        mobileScreen ? 'w-full' : 'lg:w-[290px]'
                      } `}
                      disabled={true}
                      value={
                        pictureSize === 0
                          ? '1mb'
                          : pictureSize === 20
                          ? '2mb'
                          : pictureSize === 40
                          ? '4mb'
                          : pictureSize === 60
                          ? '6mb'
                          : pictureSize === 80
                          ? '8mb'
                          : '10mb'
                      }
                    />
                  ) : (
                    <div
                      className={`h-[40px] rounded-lg mt-1 ${
                        mobileScreen ? 'w-full' : 'lg:w-[290px]'
                      } `}
                    >
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: '#CC5869',
                          },
                        }}
                      >
                        <Slider
                          marks={marks}
                          step={20}
                          defaultValue={0}
                          onChange={(e) => setPictureSize(e)}
                          value={pictureSize}
                        />
                      </ConfigProvider>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`${
                  mobileScreen
                    ? 'w-full mb-14 mt-8'
                    : 'w-[255px] lg:w-[290px] mt-10'
                } h-[40px] `}
              >
                <span>Picture Extension</span>
                <div>
                  <Select
                    size="large"
                    name="pictureExtension"
                    label="Picture Extension"
                    options={ImageFormats.FORMATS}
                    disabled={!isEditing}
                    mode="multiple"
                    className={`h-[40px] rounded-lg mt-1 ${
                      mobileScreen ? 'w-full' : 'lg:w-[290px]'
                    } `}
                    onChange={(e) => setPictureEtensions(e)}
                    value={pictureEtensions}
                  />
                </div>
              </div>
              <hr className="w-[95%] mt-16 divide-slate-500" />
              <div className="flex flex-wrap mt-10">
                <div className="flex flex-wrap lg:w-full justify-self-start ">
                  <div>
                    <div className="flex flex-wrap self-start mr-14">
                      <div>
                        <span>Select Icon</span>
                        <div className={`${' rounded-lg mr-4 mt-2'}`}>
                          <Dropdown
                            disabled={!isEditing}
                            iconSelected={iconSelected}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="mb-2">Add New Interests</span>
                        <Input
                          name="interests"
                          label="Add New Interests"
                          options={ImageFormats.FORMATS}
                          placeholder="Add new interest"
                          disabled={!isEditing}
                          className="w-[255px] lg:w-[300px] h-[40px] rounded-lg mb-4"
                          onChange={(e) => {
                            const status = e.target.value.match(/^[a-zA-Z ]+$/);
                            if (status || !e.target.value) {
                              handleInterests(e);
                            }
                          }}
                          value={singleInterest}
                        />
                      </div>
                    </div>

                    {singleInterest && (
                      <button
                        onClick={saveInterests}
                        className={`float-right mb-20 ${
                          mobileScreen ? 'mr-[140px]' : 'mr-16'
                        } bg-lightburgundy pt-1 pb-1 pr-2 pl-2 text-slate-50 rounded-full `}
                      >
                        Add
                      </button>
                    )}
                  </div>
                  {!mobileScreen && (
                    <div className="w-px h-full bg-gray mr-14" />
                  )}

                  <div className={`w-[40%] ${mobileScreen && 'mt-14'}`}>
                    <div>
                      <span>Add Interests</span>
                    </div>
                    <div className="flex flex-wrap mt-6 align-top">
                      {interests?.map((item, index) => {
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
                            <span className="mr-1 self-center">
                              {item.label}
                            </span>
                            {isEditing && (
                              <CloseOutlined
                                style={{
                                  alignSelf: 'center',
                                  fontSize: '10px',
                                  color: '#484747',
                                }}
                                onClick={() => removeInterest(item)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default AppSettings;
