import React, { useState } from 'react';
import { Layout, Tabs } from 'antd';
import Header from '../../../components/Header/Header';
import CandidateManagementTable from '../../../components/CandidateManagementTable/CandidateManagementTable';
import CandidatePendingModerations from '../../../components/CandidatePendingModerations/CandidatePendingModerations';
import { isMobileScreen } from '../../../utilities';
import ReportedCandidates from '../../../components/ReportedCandidates/ReportedCandidates';
import { GroupType } from '../../../enum';

const { Content } = Layout;

const CandidateManagement = () => {
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [activeTabKey, setActiveTabKey] = useState('candidates');
  const mobileScreen = isMobileScreen();
  const onChange = (key) => {
    setActiveTabKey(key);
  };
  const items = [
    {
      key: 'pendingModerations',
      label: `Pending Moderations`,
      children: <CandidatePendingModerations activeTabKey={activeTabKey} />,
    },
    {
      key: 'candidates',
      label: `Candidates`,
      children: <CandidateManagementTable activeTabKey={activeTabKey} />,
    },
    {
      key: 'reportedCandidates',
      label: `Reported Candidates`,
      children: <ReportedCandidates activeTabKey={activeTabKey} />,
    },
  ];
  return (
    <Layout>
      <Header content="Candidate Management" />
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-40'} `}>
        <div
          id="navDiv"
          className={`w-[100%] h-full bg-white rounded-3xl lg:p-12 p-4 relative ${
            mobileScreen && 'mb-10'
          }`}
        >
          <div className="bg-white w-4 h-12 absolute left-0 rounded-tr-3xl z-10" />
          <div className="bg-appGray w-2 h-12 absolute -left-2   z-10" />
          <div className="bg-white w-4 h-12 absolute right-0  rounded-tr-3xl z-10" />
          <div className="bg-appGray w-2 h-12 absolute -right-2   z-10" />
          {currentUserGroup?.includes(GroupType.SUPER_ADMIN) ? (
            <Tabs
              defaultActiveKey="pendingModerations"
              items={items}
              onChange={onChange}
              className="z-2"
            />
          ) : (
            <CandidateManagementTable />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default CandidateManagement;
