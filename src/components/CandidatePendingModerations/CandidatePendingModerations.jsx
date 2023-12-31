import { Form, Button, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { teamConfig } from './CandidatePendingModerationsTableConfig';
import './CandidatePendingModerations.css';
import {
  fetchGalleryUpdatedImages,
  listHeavenlymatchPendingCandidates,
  pushImagesInRecordObject,
} from '../../shared/api/candidates';
import HeavenlyMatchTable from '../../shared/Table/HeavenlyMatchTable';
import InviteCandidateModal from '../InviteCandidateModal/InviteCandidateModal';
import AuthContext from '../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isMobileScreen } from '../../utilities';
import { GroupType, candidateModerationTypes } from '../../enum';
import RejectionModal from '../RejectionModal/RejectionModal';

const CandidatePendingModerations = () => {
  const mobileScreen = isMobileScreen();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBioRejectionModalOpen, setIsBioRejectionModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userRecord, setUserRecord] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const onView = async (record) => {
    setUserRecord(record);
    setCurrentUser(record);
    // only execute if moderation type is picChange
    if (record?.imageModerationType === candidateModerationTypes.PICCHANGE) {
      await fetchGalleryUpdatedImages(record);
    }
    if (record?.moderationType === candidateModerationTypes.NEWPROFILE) {
      await pushImagesInRecordObject(record);
      window.localStorage.setItem('userDynamo', JSON.stringify(record));
      authContext.setUserDynamo(record);
      navigate(`candidate-details/candidate-about-me/${record.id}`);
    } else if (
      record?.imageModerationType === candidateModerationTypes.PICCHANGE ||
      record?.bioModerationType === candidateModerationTypes.BIOUPDATE
    ) {
      setIsBioRejectionModalOpen(true);
    }
  };
  // Fetching team member column list.
  const columns = teamConfig(onView);
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
      await getUserDetails();
    })();
  }, []);

  // Api to fetch data from DB
  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await listHeavenlymatchPendingCandidates();
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

  const filteredData = dataSource?.filter(
    (item) =>
      item.moderationType?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.bioModerationType
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase()) ||
      item.imageModerationType
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase()) ||
      item.username?.toLowerCase()?.includes(searchValue.toLowerCase())
  );
  return (
    <Form form={form} component={false}>
      <div id="candidateManagementTable">
        <div>
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
            {currentUserGroup?.includes(GroupType.SUPER_ADMIN) ? (
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined style={{ verticalAlign: '1px' }} />}
                onClick={handleClick}
                style={{
                  width: mobileScreen ? 150 : 'auto',
                  marginBottom: mobileScreen ? 15 : '',
                  alignSelf: mobileScreen ? 'right' : '',
                  alignSelf: 'flex-end',
                }}
              >
                Invite Candidate
              </Button>
            ) : (
              ''
            )}
          </div>
          <InviteCandidateModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title={'Invite Candidate'}
          />
          <RejectionModal
            isBioRejectionModalOpen={isBioRejectionModalOpen}
            setIsBioRejectionModalOpen={setIsBioRejectionModalOpen}
            title={
              userRecord?.bioModerationType ===
              candidateModerationTypes.BIOUPDATE
                ? 'Candidate Bio'
                : userRecord?.imageModerationType
                ? 'Picture Change'
                : ''
            }
            fetchUserDetails={getUserDetails}
            user={currentUser}
          />
          <HeavenlyMatchTable
            columns={mergedColumns}
            dataSource={filteredData}
            rowClassName="editable-row heaven-red"
            loading={isLoading}
          />
        </div>
      </div>
    </Form>
  );
};

export default CandidatePendingModerations;
