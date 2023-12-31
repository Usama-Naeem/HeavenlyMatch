import { Button, Input, Layout, Modal, Spin, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import CandidateEditSaveButtons from '../../../components/CandidateEditSaveButtons/CandidateEditSaveButtons';
import {
  PHONELENGTH,
  isMobileScreen,
  passwordValidation,
} from '../../../utilities';
import { CloseCircleOutlined } from '@ant-design/icons';

import './MyProfile.scss';
import AuthContext from '../../../shared/context/AuthContext';
import { updateUser } from '../../../shared/api/candidates';
import { updateHeavenlymatchAdmin } from '../../../graphql/mutations';
import { USER_UPDATED } from '../../../shared/constant/success';
import { changePassword } from '../../../shared/api/cognito';
import {
  ENTER_0LD_PASSWORD,
  NEW_AND_CONFIRM_PASSWORD,
  PASSWORD_MUST_BE_ALPHANUMERIC,
  PASSWORD_NOT_MATCHED,
} from '../../../shared/constant/error';

const { Content } = Layout;

const MyProfile = () => {
  const authContext = useContext(AuthContext);
  const [data] = useState(authContext.admin || {});
  const mobileScreen = isMobileScreen();
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previousStates, setPreviousStates] = useState({});
  const [fname, setFname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('+1');

  useEffect(() => {
    (async () => {
      setFname(data.firstName);
      setLname(data.lastName);
      setPhone(!data.phoneNumber ? '+1' : data.phoneNumber);
    })();
  }, []);

  const editStatus = (status) => {
    if (status) {
      setPreviousStates({
        fname: fname,
        lname: lname,
        phone: phone,
      });
      setIsEditing(status);
    }
    if (!status) {
      handleFormSubmit();
    }
  };

  const undoChanges = () => {
    setFname(previousStates.fname);
    setLname(previousStates.lname);
    setPhone(previousStates.phone);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOldPassword(null);
    setNewPassword(null);
    setConfirmPassword(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async () => {
    try {
      const editUser = {
        id: data.id,
        firstName: fname,
        lastName: lname,
        phoneNumber: phone,
      };
      if (editUser.phoneNumber.length < 12) {
        message.warning(PHONELENGTH, [2]);
        return;
      }
      const response = await updateUser(editUser, updateHeavenlymatchAdmin);
      const details = response.data.updateHeavenlymatchAdmin;
      // store updated user object in localStorage
      window.localStorage.setItem('admin', JSON.stringify(details));
      // store updated user object in authContext
      authContext.setAdmin(details);
      message.success(USER_UPDATED, [4]);
      setIsEditing(false);
    } catch (error) {
      message.error(error.message, [4]);
      throw new Error(error.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      setErrorMessage(null);
      let passwordValidated = passwordValidation(confirmPassword);
      if (newPassword !== confirmPassword) {
        message.warning(PASSWORD_NOT_MATCHED, [4]);
        return;
      }
      if (!oldPassword) {
        message.warning(ENTER_0LD_PASSWORD, [4]);
        return;
      }
      if (!newPassword && !confirmPassword) {
        message.warning(NEW_AND_CONFIRM_PASSWORD, [4]);
        return;
      }
      if (!passwordValidated) {
        message.error(PASSWORD_MUST_BE_ALPHANUMERIC, [4]);
        return;
      }
      setIsLoading(true);
      await changePassword(oldPassword, newPassword);
      message.success('Your password is successfully changed', [3]);
      setIsModalOpen(false);
      setErrorMessage(null);
      setOldPassword(null);
      setNewPassword(null);
      setConfirmPassword(null);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw Error(err.message);
    }
  };

  return (
    <>
      <Modal
        title="Change Password"
        open={isModalOpen}
        width={400}
        closeIcon={
          <CloseCircleOutlined
            className="text-xl text-black"
            onClick={handleCancel}
          />
        }
        className="ant-modal-content"
      >
        <div className="flex flex-col ">
          <div className="w-[255px] lg:w-[320px] self-center">
            <span>Enter Old Password</span>
            <Input.Password
              prefix={<img src="/passwordIcon.svg" />}
              className="w-[255px] lg:w-[320px] h-[40px] rounded-lg mt-2"
              placeholder="Old Password"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              required={true}
            />
          </div>
          <div className="w-[255px] lg:w-[320px] self-center mt-6">
            <span>Enter New Password</span>
            <Input.Password
              prefix={<img src="/passwordIcon.svg" />}
              className="w-[255px] lg:w-[320px] h-[40px] rounded-lg mt-2"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="w-[255px] lg:w-[320px] self-center mt-6">
            <span>Re-Enter Password</span>
            <Input.Password
              prefix={<img src="/passwordIcon.svg" />}
              className="w-[255px] lg:w-[320px] h-[40px] rounded-lg mt-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          {errorMessage && (
            <p className="text-red-400 mt-2 ml-3">{errorMessage}</p>
          )}
          <div className="w-[255px] lg:w-[320px] self-center mt-2">
            <Button
              className="w-[255px] lg:w-[320px] h-[40px] rounded-full mt-6 mb-4 bg-[#cc5869] text-white "
              onClick={handleChangePassword}
            >
              {isLoading ? <Spin /> : 'Save Password'}
            </Button>
          </div>
        </div>
      </Modal>
      <Layout>
        <Header content="My Profile" />
        <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
          <div
            id="navDiv"
            className={`md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
              mobileScreen && 'mb-10'
            }`}
          >
            <div className="flex justify-between items-start mb-2 xl:ml-8 mt-8 mr-5">
              <h1 className=" font-medium font-sans text-xl ">
                Profile Settings
              </h1>
              <div className="flex gap-5">
                <CandidateEditSaveButtons
                  width={mobileScreen ? 20 : 40}
                  isEditing={isEditing}
                  editStatus={editStatus}
                />
                {isEditing && (
                  <button
                    className="border-2 border-slate-200 rounded-full pl-4 pr-4"
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
                <div className="flex flex-wrap lg:gap-10 ">
                  <div className="flex flex-col mb-6">
                    <span>First Name</span>
                    <Input
                      type="text"
                      placeholder="Enter First Name"
                      className="w-[255px] lg:w-[290px] h-[40px] rounded-lg mt-2"
                      disabled={!isEditing}
                      value={fname}
                      onChange={(e) => {
                        if (
                          e.target.value.match(/^([a-zA-Z]+[\s]{0,1})*$/) ||
                          e.target.value === ''
                        ) {
                          setFname(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col mb-6">
                    <span>Last Name</span>
                    <Input
                      type="text"
                      placeholder="Enter Last Name"
                      className="w-[255px] lg:w-[290px] h-[40px] rounded-lg mt-2"
                      disabled={!isEditing}
                      value={lname}
                      onChange={(e) => {
                        if (
                          e.target.value.match(/^([a-zA-Z]+[\s]{0,1})*$/) ||
                          e.target.value === ''
                        ) {
                          setLname(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap lg:gap-10 ">
                  <div className="flex flex-col mb-8">
                    <span>Phone Number</span>
                    <Input
                      type="text"
                      placeholder="+1234567890"
                      className="w-[255px] lg:w-[290px] h-[40px] rounded-lg mt-2"
                      maxLength={12}
                      disabled={!isEditing}
                      value={phone}
                      onChange={(e) => {
                        if (e.target.value.match(/^\+1\d{0,10}$/)) {
                          setPhone(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span>Email ID</span>
                  <span className="text-slate-400">{data.email}</span>
                  <hr className="w-[95%]  divide-slate-500" />
                </div>
                <div className="mt-10">
                  <button
                    className="flex gap-2 pl-2 pr-2 pt-1 pb-1 border-2 border-slate-200 rounded-full"
                    onClick={showModal}
                  >
                    <img src="/showPassword.svg" className="self-center" />
                    <div>Change Password</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default MyProfile;
