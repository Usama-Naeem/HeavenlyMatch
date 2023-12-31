import React, { Fragment, useRef, useState } from 'react';
import { Form, Input, message } from 'antd';
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';

import { UserOutlined } from '@ant-design/icons';

import ResetPassword from './ResetPassword';
import PasswordUpdated from './PasswordUpdated';
import {
  CORRECT_EMAIL,
  EMAIL_NOT_FOUND,
  ENTER_EMAIL,
} from '../../shared/constant/error';
import { Auth } from 'aws-amplify';
import { FORGOT, RESET, UPDATED } from '../../constant/authConstants';
import logo from '../../assets/logo.png';
import ResetOTP from './ResetOTP';

const ForgotPassword = (props) => {
  const [display, setDisplay] = useState('forgot');
  const [userEmail, setUserEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [otp, setOtp] = useState('');
  const ref = useRef();

  const forgotPassword = () => {
    if (userEmail) {
      props.setLoader(true);
      setUserEmail(userEmail);
      Auth.forgotPassword(userEmail.toLowerCase())
        .then((response) => {
          props.setLoader(false);
          props.setShowOTPScreen(!props.showOTPScreen);
          setDisplay('reset');
        })
        .catch((err) => {
          props.setLoader(false);
          err.message === EMAIL_NOT_FOUND
            ? message.error(CORRECT_EMAIL)
            : message.error(err.message);
        });
    } else {
      setErrorMessage(ENTER_EMAIL);
    }
  };

  const onChange = (event) => {
    setUserEmail(event.target.value);
    setErrorMessage(null);
  };

  const clearOTP = () => {
    ref.current.clearOTP()
  }
  return (
    <Fragment>
      <div className={'flex items-center justify-center'}>
        <img src={logo} alt="logo" />
      </div>

      {
       (
        display === UPDATED && (

          <div className="flex flex-col justify-center items-center w-[300px] lg:w-[450px] text-sm text-white ">
            <h1
          className="font-sans md:text-2xl text-lightColor mb-4"
          style={{ color: 'white' }}
        >
          Password Updated
        </h1>
            <h1>
            You have successfully updated your password.

              </h1>
          </div>
        )
      )}
      {display === FORGOT && (
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          className="flex flex-col items-start justify-start"
        >
          {errorMessage && (
            <p
              className="error-message text-red-500 mb-4"
              aria-live="assertive"
            >
              {errorMessage}
            </p>
          )}
                  <p
          className="font-sans md:text-2xl text-lightColor text-left text-white mb-6"
        >
          Forgot Your Password?{' '}
        </p>
          <Input
            type="Text"
            className="rounded-3xl h-10 mb-6 email"
            placeholder="Email"
            prefix={<UserOutlined style={{ color: '#CC5869' }} />}
            onChange={onChange}
          />
          <FormSubmitButton
            type="primary"
            className="w-[300px] lg:w-[450px] h-[40px] submit-button"
            label={'Reset Password'}
            onClick={() => forgotPassword()}
          />
        </Form>
      )}
      {display === RESET && (
        <>
                <h1
          className="font-sans md:text-2xl text-lightColor"
          style={{ color: 'white' }}
        >
          Enter the code and create a new password
        </h1>
          <ResetOTP setOtp={setOtp} ref={ref}  />
          <div className="w-[300px] lg:w-[450px] h-[40px] text-sm text-white ">
            In order to protect your password, make sure your password
            <ul className="mt-2">
              <li><span className="text-2xl align-middle">•</span> Is longer that 7 characters</li>
              <li><span className="text-2xl align-middle">•</span> Should contain numeric and alphabets both</li>
            </ul>
          </div>
          <ResetPassword
            userEmail={userEmail}
            setDisplay={setDisplay}
            otp={otp}
            clearOTP={clearOTP}
            loader={props.loader} setLoader={props.setLoader}
          />
        </>
      )}
      {display === UPDATED && <PasswordUpdated />}
    </Fragment>
  );
};

export default ForgotPassword;
