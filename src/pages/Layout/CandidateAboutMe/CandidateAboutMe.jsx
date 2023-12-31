import React, { useEffect, useState } from 'react';
import { Form, Layout, Radio, Spin, message } from 'antd';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import FormSelect from '../../../shared/components/FormSelect/FormSelect';
import { Country, State, City } from 'country-state-city';
import dayjs from 'dayjs';
import Select from 'react-select';
import {
  EthnicitySelectOptions,
  FeetSelectOptions,
  InchSelectOptions,
  VisaStatusSelectOptions,
} from '../../../shared/enum/selectOptions';
import FormInput from '../../../shared/components/FormInput/FormInput';
import { FormRule } from '../../../enum/formRules';
import {
  formatDate,
  getHeavenlyMatchUser,
  getTwilioToken,
  heightConvertIntoFeets,
  updateUser,
  updateUserDisplayNameInConversations,
} from '../../../shared/api/candidates';
import {
  updateHeavenlymatchUserGeneralInfo,
  updateHeavenlymatchUsers,
} from '../../../graphql/mutations';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import { USER_UPDATED } from '../../../shared/constant/success';
import { FORM_DETAILS_ARE_NOT_CHANGED } from '../../../shared/constant/warning';
import { isMobileScreen } from '../../../utilities';
import {
  GroupType,
  candidateModerationTypes,
  selectStyles,
} from '../../../enum';
import { useParams } from 'react-router-dom';
import './candidateAboutMe.css';
import FormDatePicker from '../../../shared/components/DatePicker/DatePicker';
import TextAreaInput from '../../../shared/components/TextAreaInput/TextAreaInput';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const CandidateAboutMe = () => {
  const mobileScreen = isMobileScreen();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedBirthCountry, setSelectedBirthCountry] = useState(null);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [data, setData] = useState(null);
  const { Content } = Layout;
  const [updatedValues, setUpdatedValues] = useState({});
  const [error, setError] = useState({});
  const { id } = useParams();

  const editStatus = (status) => {
    if (
      selectedCity &&
      selectedCountry &&
      selectedState &&
      selectedBirthCountry
    ) {
      if (status) {
        setIsEditing(status);
      }
      if (!status) {
        document.getElementById('submit').click();
      }
    }
    if (!selectedState) {
      setError({ type: 'state', error: 'State is a required field' });
    } else if (!selectedCity) {
      setError({ type: 'city', error: 'City is a required field' });
    }
  };
  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
        setSelectedCountry(
          JSON.parse(userData.userGeneralInfo.residenceCountry)
        );
        setSelectedBirthCountry(
          JSON.parse(userData.userGeneralInfo.birthCountry)
        );
        setSelectedCity(JSON.parse(userData.userGeneralInfo.city));
        setSelectedState(JSON.parse(userData.userGeneralInfo.state));
        setUpdatedValues(userData.userGeneralInfo);
      }
    })();
  }, []);

  const disabledDate = (current) => {
    const eighteenYearsAgo = dayjs().subtract(18, 'years').endOf('day');
    return current && current > eighteenYearsAgo;
  };

  const handleFormSubmit = async (values) => {
    const dateOfBirth = formatDate(values.birthday);
    if (values.visaStatus) {
      setIsEditing(!isEditing);
      try {
        if (formDataChanged) {
          const editUser = {
            id: data.userGeneralInfo.id,
            ethnicity: values.ethnicity,
            residenceCountry: JSON.stringify(selectedCountry),
            birthCountry: JSON.stringify(selectedBirthCountry),
            city: JSON.stringify(selectedCity),
            state: JSON.stringify(selectedState),
            height: values.feet + '.' + values.inch,
            phoneContact: values.phoneContact,
            visaStatus: values.visaStatus,
          };

          const userDetails = {
            id: data.id,
            firstName: values.firstName,
            lastName: values.lastName,
            middleName: values.middleName,
            displayName: values.displayName,
            gender: values.gender,
            birthday: dateOfBirth,
            userOldBio: values.userOldBio,
          };
          if (values.birthday === undefined) {
            delete userDetails.birthday;
          }
          await updateUser(editUser, updateHeavenlymatchUserGeneralInfo);
          const response = await updateUser(
            userDetails,
            updateHeavenlymatchUsers
          );
          // update displayName in twilio chat
          if (userDetails.displayName !== data?.displayName) {
            const response = await getTwilioToken(data.id);
            await updateUserDisplayNameInConversations(
              response,
              userDetails?.displayName,
              data.id
            );
          }
          const updateUserProfile = response.data.updateHeavenlymatchUsers;
          setData(updateUserProfile);
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

  const height = heightConvertIntoFeets(updatedValues?.height);
  const values = {
    firstName: data?.firstName,
    middleName: data?.middleName,
    lastName: data?.lastName,
    displayName: data?.displayName,
    gender: data?.gender,
    ethnicity: updatedValues.ethnicity,
    city: updatedValues.city,
    birthCountry: updatedValues.birthCountry,
    state: updatedValues.state,
    feet: height.feet !== 0 && height.feet,
    inch: height.feet !== 0 && height.inches,
    phoneContact: updatedValues.phoneContact,
    visaStatus: updatedValues.visaStatus,
    userOldBio: data?.userOldBio,
  };
  return (
    <Layout>
      {data !== null && <CandidateAboutMeHeader data={data} />}
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div
          id="navDev"
          className={`font-medium md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          <div className="flex justify-between mb-12">
            <h1 className="font-medium font-sans text-xl lg:ml-12">About Me</h1>
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
          <div className="flex items-center justify-center flex-col">
            {data !== null ? (
              <Form
                layout="vertical"
                onFinish={handleFormSubmit}
                className=" lg:gap-x-10 lg:gap-y-6 xl:ml-20  md:w-full"
                onValuesChange={() => setFormDataChanged(true)}
                initialValues={values}
              >
                {/* FIRST ROW  */}
                <div className="inline-flex flex-wrap mb-8">
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <FormInput
                      name="firstName"
                      label="First Name"
                      rules={FormRule.FIRSTNAME}
                      placeholder="Please enter your First Name"
                      disabled={!isEditing}
                      className="h-10"
                    />
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <FormInput
                      name="middleName"
                      label="Middle Name"
                      rules={FormRule.MIDDLENAME}
                      placeholder="Please enter your Middle Name"
                      disabled={!isEditing}
                      className="h-10"
                    />
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <FormInput
                      name="lastName"
                      label="Last Name"
                      rules={FormRule.LASTNAME}
                      placeholder="Please enter your Last Name"
                      disabled={!isEditing}
                      className="h-10"
                    />
                  </div>
                </div>
                {/* SECOND ROW  */}
                <div className="inline-flex flex-wrap mb-8">
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <FormInput
                      name="displayName"
                      label="Display Name"
                      rules={FormRule.DISPLAYNAME}
                      placeholder="Please enter your Display Name"
                      disabled={!isEditing}
                      className="h-10"
                    />
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <FormDatePicker
                      name="birthday"
                      label="Birthday"
                      className={`${
                        mobileScreen ? 'w-full' : 'lg:w-[290px]'
                      } h-[40px] rounded-lg`}
                      disabled={!isEditing}
                      defaultValue={dayjs(data.birthday, 'YYYY-MM-DD')}
                      format="MM-DD-YYYY"
                      rules={FormRule.BIRTHDAY}
                      disabledDate={disabledDate}
                    />
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <Form.Item
                      name="gender"
                      label="Gender"
                      rules={FormRule.GENDER}
                    >
                      <Radio.Group
                        disabled={!isEditing}
                        id="antDesignRadioButton"
                      >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                {/* THIRD ROW  */}
                <div className="inline-flex flex-wrap mb-8">
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <FormSelect
                      name="ethnicity"
                      label="Ethnicity"
                      rules={FormRule.ETHNICITY}
                      options={EthnicitySelectOptions.ETHNICITY}
                      placeholder="Please select your Ethnicity"
                      disabled={!isEditing}
                    />
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <span className="text-red-500">* </span>
                        <span className="mb-2">Country of Birth</span>
                      </div>
                      <Select
                        options={Country.getAllCountries().map((item) => ({
                          value: item.name,
                          label: item.name,
                        }))}
                        getOptionLabel={(options) => {
                          return options['value'];
                        }}
                        getOptionValue={(options) => {
                          return options['value'];
                        }}
                        value={selectedBirthCountry}
                        onChange={(item) => {
                          setSelectedBirthCountry({
                            value: item.value,
                            label: item.label,
                          });
                          setFormDataChanged(true);
                        }}
                        isDisabled={!isEditing}
                        required
                        className="rounded-lg"
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-2' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <div>
                      <div className="flex flex-col">
                        <div className="mb-2">
                          <span className="text-red-500">* </span>
                          <span className="mb-2">Country of Residence</span>
                        </div>
                        <Select
                          options={Country.getAllCountries().filter(
                            (item) =>
                              item.isoCode === 'US' || item.isoCode === 'CA'
                          )}
                          getOptionLabel={(options) => {
                            return options['name'];
                          }}
                          getOptionValue={(options) => {
                            return options['name'];
                          }}
                          value={selectedCountry}
                          onChange={(item) => {
                            setSelectedCountry({
                              name: item.name,
                              isoCode: item.isoCode,
                              countryCode: item.countryCode,
                              label: item.label,
                              value: item.isoCode,
                            });
                            setSelectedCity(null);
                            setSelectedState(null);
                            setFormDataChanged(true);
                          }}
                          isDisabled={!isEditing}
                          required
                          className="rounded-lg"
                          styles={selectStyles}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* FOURTH ROW  */}
                <div className="flex flex-wrap">
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-16  mr-10`}
                  >
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <span className="text-red-500">* </span>
                        <span className="mb-2">State of Residence</span>
                      </div>
                      <div
                        className={`${
                          error &&
                          error.type === 'state' &&
                          'border-b-2 border-t-2 border-l-2 border-r-2 border-red-600 rounded-lg'
                        }`}
                      >
                        <Select
                          options={State?.getStatesOfCountry(
                            selectedCountry?.isoCode
                          )}
                          getOptionLabel={(options) => {
                            return options['name'];
                          }}
                          getOptionValue={(options) => {
                            return options['name'];
                          }}
                          value={selectedState}
                          onFocus={() => setError({})}
                          onChange={(item) => {
                            setSelectedState({
                              value: item.isoCode,
                              label: item.name,
                              name: item.name,
                              isoCode: item.isoCode,
                              countryCode: item.countryCode,
                            });
                            setFormDataChanged(true);
                            setSelectedCity(null);
                          }}
                          isDisabled={!isEditing}
                          required
                          styles={selectStyles}
                        />
                      </div>
                      {error && error.type === 'state' && (
                        <span className="text-red-500 ">{error.error}</span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-16  mr-10`}
                  >
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <span className="text-red-500">* </span>
                        <span className="mb-2">City of Residence</span>
                      </div>
                      <div
                        className={`${
                          error &&
                          error.type === 'city' &&
                          'border-b-2 border-t-2 border-l-2 border-r-2 border-red-600 rounded-lg'
                        }`}
                      >
                        <Select
                          options={City.getCitiesOfState(
                            selectedState?.countryCode,
                            selectedState?.isoCode
                          )}
                          getOptionLabel={(options) => {
                            return options['name'];
                          }}
                          getOptionValue={(options) => {
                            return options['name'];
                          }}
                          onFocus={() => setError({})}
                          value={selectedCity}
                          onChange={(item) => {
                            setFormDataChanged(true);
                            setSelectedCity({
                              name: item.name,
                              value: item.name,
                              label: item.name,
                            });
                          }}
                          isDisabled={!isEditing}
                          required
                          styles={selectStyles}
                        />
                      </div>
                      {error && error.type === 'city' && (
                        <span className="text-red-500 ">{error.error}</span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg mb-10  mr-10`}
                  >
                    <div className="mb-2">
                      <span className="text-red-500">* </span>
                      <span>Visa Status</span>
                    </div>
                    <FormSelect
                      name="visaStatus"
                      rules={FormRule.VISASTATUS}
                      options={VisaStatusSelectOptions.VISASTATUS}
                      placeholder="Select Visa Status"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {/* FIFTH ROW  */}
                <div className="flex flex-wrap">
                  <div
                    className={`${
                      mobileScreen ? 'w-full mr-10' : 'w-[200px] lg:w-[290px]'
                    } lg:mr-[40px] `}
                  >
                    <span>Height</span>
                    <div
                      className={`flex mt-2 gap-6 ${
                        mobileScreen && 'w-full justify-between '
                      }`}
                    >
                      <div className=" w-[50%]">
                        <FormSelect
                          name="feet"
                          rules={FormRule.FEET}
                          options={FeetSelectOptions.FEET}
                          placeholder="Feet"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className=" w-[50%]">
                        <FormSelect
                          name="inch"
                          rules={FormRule.INCH}
                          options={InchSelectOptions.INCH}
                          placeholder="Inch"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg  mr-10`}
                  >
                    <div className="mb-2">
                      <span className="text-red-500">* </span>
                      <span>Phone Number</span>
                    </div>
                    <FormInput
                      name="phoneContact"
                      type="phone"
                      rules={FormRule.PHONENUMBER}
                      placeholder="+12345678"
                      className="h-[40px] rounded-lg gap-2"
                      disabled={!isEditing}
                      maxLength={12}
                    />
                  </div>
                  <div
                    className={`${
                      mobileScreen ? 'w-full mb-12' : 'lg:w-[290px]'
                    } h-[40px] rounded-lg  mr-10`}
                  >
                    <TextAreaInput
                      name="userOldBio"
                      label="Bio"
                      rows={2}
                      maxLength={200}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
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

export default CandidateAboutMe;
