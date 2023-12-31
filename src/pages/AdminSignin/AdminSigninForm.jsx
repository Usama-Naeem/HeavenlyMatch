import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Spin } from 'antd';
import image from '../../assets/mainbackground.png';

import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import OTP from './OTP';
import NewPassword from './NewPassword';

Auth.configure({
  authenticationFlowType: 'CUSTOM_AUTH',
});

export default function AdminSigninForm() {
  const [forgot, setForgot] = useState(false);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [showNewPasswordScreen, setshowNewPasswordScreen] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);


  return (
    <div
      className="h-[100vh] flex"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'round',
      }}
    >
      <div className={`new-signin-backgroud h-full `}>
        {loader && <Spin />}
        {!forgot && !showOTPScreen && !showNewPasswordScreen ? (
          <SignIn 
          setLoader={setLoader} setUser={setUser} setshowNewPasswordScreen={setshowNewPasswordScreen} setShowOTPScreen={setShowOTPScreen} setForgot={setForgot} />
        ) : !forgot && showOTPScreen && !showNewPasswordScreen ? (
          <OTP user={user} setLoader={setLoader}/>
        ) : !forgot && !showOTPScreen && showNewPasswordScreen ? (
          <NewPassword user={user} setLoader={setLoader} setshowNewPasswordScreen={setshowNewPasswordScreen} />
        ) : (
          <ForgotPassword showOTPScreen={showOTPScreen} setLoader={setLoader} setShowOTPScreen={setShowOTPScreen} />
        )}
      </div>
    </div>
  );
}
