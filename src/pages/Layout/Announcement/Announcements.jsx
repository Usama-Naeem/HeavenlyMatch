import { Button, Input, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import HeavenlyMatchTable from '../../../shared/Table/HeavenlyMatchTable';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { announcementConfig } from './AnnouncementTableConfig';
import { listHeavenlymatchAnnouncements } from '../../../shared/api/announcements';
import CreateAnnouncement from '../../../components/CreateAnnouncement/CreateAnnouncement';
import ViewAnnouncement from '../../../components/ViewAnnouncement/ViewAnnouncement';
import { isMobileScreen } from '../../../utilities';
const { Content } = Layout;

const Announcements = () => {
  const mobileScreen = isMobileScreen();
  const [searchValue, setSearchValue] = useState('');
  const [dataSource, setDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateAnnouncementModalOpen, setIsCreateAnnouncementModalOpen] =
    useState(false);
  const [isViewAnnouncementModalOpen, setIsViewAnnouncementModalOpen] =
    useState(false);
  const [viewAnnouncement, setViewAnnouncement] = useState(null);

  const onView = (record) => {
    setIsViewAnnouncementModalOpen(true);
    setViewAnnouncement(record);
  };
  // Fetching announcement column list.
  const handleClick = () => {
    setIsCreateAnnouncementModalOpen(true);
  };
  const columns = announcementConfig(onView);
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.inputType,
        inputProps: col.inputProps,
      }),
    };
  });

  // Fetching data from dynamo
  useEffect(() => {
    (async () => {
      await fetchAnnouncements();
    })();
  }, []);

  const filteredData = dataSource?.filter(
    (item) =>
      item.announcementsType
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase()) ||
      item.announcementsFor?.toLowerCase()?.includes(searchValue.toLowerCase())
  );
  // Api to fetch data from DB
  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await listHeavenlymatchAnnouncements();
      setDataSource(response);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw Error(err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <Layout>
      <Header content="Announcement" />
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div id="navDiv" className="w-[100%] h-full bg-white rounded-3xl p-4">
          <div id="candidateManagementTable">
            <div
              className={`flex ${
                !mobileScreen ? 'justify-between' : 'flex-col-reverse'
              } mb-2`}
            >
              <Input
                placeholder="Search Here"
                style={{
                  width: mobileScreen ? 'auto' : 200,
                }}
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={handleSearch}
              />
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined style={{ verticalAlign: '1px' }} />}
                className="!bg-lightburgundy hover:bg-lightburgundy"
                onClick={handleClick}
                style={{
                  width: mobileScreen ? 180 : 'auto',
                  marginBottom: mobileScreen ? 15 : '',
                  alignSelf: mobileScreen ? 'right' : '',
                  alignSelf: 'flex-end',
                }}
              >
                New Announcement
              </Button>
            </div>
            <CreateAnnouncement
              title={'New Announcement'}
              isModalOpen={isCreateAnnouncementModalOpen}
              setIsModalOpen={setIsCreateAnnouncementModalOpen}
              fetchUserDetails={fetchAnnouncements}
            />
            <ViewAnnouncement
              title={'Announcement'}
              isModalOpen={isViewAnnouncementModalOpen}
              setIsModalOpen={setIsViewAnnouncementModalOpen}
              data={viewAnnouncement}
            />
            <HeavenlyMatchTable
              columns={mergedColumns}
              dataSource={filteredData}
              rowClassName="editable-row heaven-red"
              loading={isLoading}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Announcements;
