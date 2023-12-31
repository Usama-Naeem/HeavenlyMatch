import React, { useContext, useEffect, useState } from 'react';
import { Layout, Button, Tooltip } from 'antd';
import HeavenlyLogo from '../../assets/logo.png';
import { ReactComponent as LogoutSvg } from '../../assets/Logout.svg';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getUserByEmail } from '../../shared/api/candidates';
import { listHeavenlymatchAdmins } from '../../graphql/queries';
import AuthContext from '../../shared/context/AuthContext';
import './Header.css';

import { isMobileScreen } from '../../utilities';

const { Header: AntHeader } = Layout;

const Header = ({ mainHeader, content, display, ...props }) => {
  const [userName, setUserName] = useState('');
  const headerStyle = mainHeader
    ? 'h-[65px] bg-burgundy text-white'
    : 'h-[80px] bg-white text-black';

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Fetch the user's name from Cognito
    (async () => {
      await getUserDetails();
    })();
  }, []);

  const getUserDetails = async () => {
    // getcurrent signed in user name from cognito auth session
    const user = await Auth.currentAuthenticatedUser();
    // filter current user details from db using filter
    const getCurrentUser = await getUserByEmail(
      user.attributes.email,
      listHeavenlymatchAdmins
    );
    // destructure user object and store current user details in adminDetails
    const adminDetails = getCurrentUser.data.listHeavenlymatchAdmins.items[0];
    setUserName(adminDetails.firstName + ' ' + adminDetails.lastName);

    // store user object in localStorage
    window.localStorage.setItem('admin', JSON.stringify(adminDetails));
    // store user object in authContext
    authContext.setAdmin(getCurrentUser.data.listHeavenlymatchAdmins.items[0]);
  };

  const handleMenuDisplayChange = () => {
    props.handleDisplayChange();
  };

  const mobileScreen = isMobileScreen();

  const logout = async () => {
    window.localStorage.clear();
    navigate('/signin');
    authContext.removeUserGroupHandler();
  };

  return (
    <AntHeader
      id="header-container"
      className={`${headerStyle} pl-5 pt-1 h-[10vh]`}
    >
      {mainHeader && (
        <div className="flex justify-between w-full ">
          <div className="flex justify-between w-full">
            {mobileScreen &&
              (display ? (
                <MenuFoldOutlined
                  className="self-center"
                  onClick={handleMenuDisplayChange}
                />
              ) : (
                <MenuUnfoldOutlined
                  className="self-center"
                  onClick={handleMenuDisplayChange}
                />
              ))}
            <img src={HeavenlyLogo} className="h-[59px] pl-[60px]" alt="" />
          </div>
          <div className="flex justify-end items-center w-[300px] ">
            {!mobileScreen && <p className="text-xl">{userName}</p>}
            <Tooltip title="Logout">
              <Button
                type="text"
                shape="circle"
                className={`flex items-end justify-end ${
                  !mobileScreen ? 'ml-10 mr-5' : ''
                }`}
                //This is temporary onClick implementation
                onClick={logout}
              >
                <LogoutSvg height="25" width="25" className="text-white" />
              </Button>
            </Tooltip>
          </div>
        </div>
      )}
      {content ? <div className="pt-5 text-2xl">{content}</div> : ''}
    </AntHeader>
  );
};

export default Header;
