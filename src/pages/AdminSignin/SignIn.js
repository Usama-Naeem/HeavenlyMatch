import React, { Fragment, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';
import logo from '../../assets/logo.png';

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import {
  CUSTOM_CHALLENGE,
  NEW_PASSWORD_REQUIRED,
} from '../../constant/authConstants';
import { FormRule } from '../../enum/formRules';
import FormInput from '../../shared/components/FormInput/FormInput';

const SignIn = (props) => {
  const [visable, setVisable] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage(null);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage(null);
  };

  const onSignin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage('Please Fill the required Fields!');
        return;
      }
      props.setLoader(true);

      // Cognito API for sign in
      const userData = await Auth.signIn({
        username: email.toLowerCase(),
        password: password,
      });
      if (userData.challengeName === NEW_PASSWORD_REQUIRED) {
        // saving the user data in context
        props.setLoader(false);
        props.setUser(userData);
        props.setshowNewPasswordScreen(true);
        return;
      }
      if (userData.challengeName === CUSTOM_CHALLENGE) {
        props.setUser(userData);
        props.setShowOTPScreen(true);
        props.setLoader(false);
      }
    } catch (error) {
      props.setLoader(false);
      message.error(error.message, [4]);
    }
  };
  const forgetPassword = () => {
    props.setForgot(true);
  };
  return (
    <Fragment>
      <div className={'flex items-center justify-center'}>
        <img src={logo} alt="logo" />
      </div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={() => onSignin()}
        className="flex flex-col items-start justify-start"
      >
        {errorMessage && (
          <p className="error-message text-red-500 mb-4" aria-live="assertive">
            {errorMessage}
          </p>
        )}
        <h1
          className="md:text-4xl text-lightColor flex flex-col items-start justify-start mb-6 font-normal"
          style={{ color: 'white' }}
        >
          Login
        </h1>
        <FormInput
          name="email"
          type="email"
          className="rounded-3xl h-10 mb-1 email w-[300px] lg:w-[450px]"
          placeholder="Email"
          prefix={<UserOutlined style={{ color: '#CC5869' }} />}
          onChange={onEmailChange}
          rules={FormRule.EMAIL}
        />
        <FormInput
          id="password"
          type="password"
          className="rounded-3xl h-10 mt-3 email w-[300px] lg:w-[450px]"
          placeholder="Password"
          suffix={
            visable ? (
              <EyeOutlined onClick={() => setVisable(!visable)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => setVisable(!visable)} />
            )
          }
          prefix={<LockOutlined style={{ color: '#CC5869' }} />}
          onChange={onPasswordChange}
        />

        <div className="flex w-full mb-8 justify-between  ">
          <Checkbox className="">Remeber me</Checkbox>
          <Button
            type="link"
            onClick={forgetPassword}
            className="forgot-password-link"
          >
            Forgot your password?
          </Button>
        </div>
        <FormSubmitButton
          type="primary"
          className="w-[300px] lg:w-[450px] h-[40px] submit-button"
          label="Login"
        />
      </Form>
    </Fragment>
  );
};

export default SignIn;
