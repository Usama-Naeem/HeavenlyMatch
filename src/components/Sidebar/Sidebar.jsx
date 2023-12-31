import React, { useState, useEffect } from 'react';
import { Menu, Divider, Layout, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import './Sidebar.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AdminMenu, CandidateMenu } from '../../shared/AdminMenu';
import { isMobileScreen } from '../../utilities';

const { Sider } = Layout;

const Sidebar = ({ ...props }) => {
  const mobileScreen = isMobileScreen();
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarItems, setSidebarItems] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const uuid = JSON.stringify(params).split('/');
  const parsedUUID = uuid[3]?.substring(0, 36);

  const pathName = location.pathname.split('/');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [location.pathname]);

  const fetchMenuItems = () => {
    let menuItems;
    if (pathName?.includes('candidate-details')) {
      menuItems = Object.values(CandidateMenu).map((menuItem) => ({
        ...menuItem,
        label: (
          <Link to={`${menuItem.route}/${parsedUUID}`}>{menuItem.name}</Link>
        ),
      }));
      setSidebarItems(menuItems);
      return;
    }
    if (currentUserGroup?.includes('volunteer')) {
      menuItems = Object.values(AdminMenu)
        .filter(
          (menuItem) =>
            menuItem.key === 'candidate-management' ||
            menuItem.key === 'my-profile'
        )
        .map((menuItem) => ({
          ...menuItem,
          label: <Link to={menuItem.route}>{menuItem.name}</Link>,
        }));
    } else {
      menuItems = Object.values(AdminMenu).map((menuItem) => ({
        ...menuItem,
        label: <Link to={menuItem.route}>{menuItem.name}</Link>,
      }));
    }
    setSidebarItems(menuItems);
  };

  return (
    <Sider
      breakpoint={!mobileScreen && `lg`}
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width="230"
      className="shadow-lg"
    >
      <div
        id="side-menu"
        className="h-[92vh] flex flex-col justify-between overflow-y-auto"
      >
        {pathName.includes('candidate-details') ? (
          <Button
            type="primary"
            shape="round"
            className="bg-lightburgundy mt-10 mr-5 ml-5 h-10 text-left"
            icon={<ArrowLeftOutlined style={{ verticalAlign: '1px' }} />}
            onClick={() => {
              navigate('/dashboard/candidate-management');
              if (mobileScreen) {
                props.handleDisplayChange();
              }
            }}
          >
            Back
          </Button>
        ) : (
          ''
        )}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={
            pathName.includes('candidate-details')
              ? [pathName[4]]
              : [pathName[2]]
          } // set active item key dynamically based on location
          items={sidebarItems}
          className=" my-4 sm:mb-36 lg:mb-2"
          onClick={() => props.handleDisplayChange()}
        />
        {!mobileScreen && (
          <div className="bg-white mb-6">
            <Divider className="mb-0" />
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className:
                  'pt-0 ml-6 text-xl cursor-pointer transition duration-300 hover:text-burgundy',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
        )}
      </div>
    </Sider>
  );
};

export default Sidebar;
