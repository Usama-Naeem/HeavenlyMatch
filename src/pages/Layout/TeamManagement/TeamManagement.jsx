import React, { useState } from 'react';
import { Layout, Tabs } from 'antd';
import Header from '../../../components/Header/Header';
import TeamManagementTable from '../../../components/TeamManagementTable/TeamManagementTable';
import './TeamManagement.css';
import { isMobileScreen } from '../../../utilities';

const { Content } = Layout;

const TeamManagement = () => {
  const mobileScreen = isMobileScreen();
  const [activeTabKey, setActiveTabKey] = useState('activeSuspendedUsers');
  const onChange = (key) => {
    setActiveTabKey(key);
  };
  const items = [
    {
      key: 'activeSuspendedUsers',
      label: `Active / Suspended Users`,
      children: <TeamManagementTable activeTabKey={activeTabKey} />,
    },
    {
      key: 'archivedUsers',
      label: `Archived Users`,
      children: <TeamManagementTable activeTabKey={activeTabKey} />,
    },
  ];
  return (
    <Layout>
      <Header content="Team Management" />
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div
          id="navDiv"
          className={`w-[100%] h-full bg-white rounded-3xllg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </Content>
    </Layout>
  );
};

export default TeamManagement;
