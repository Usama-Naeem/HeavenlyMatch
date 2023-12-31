import { Form, Button, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { teamConfig } from './ReportedCandidatesTableConfig';
import './ReportedCandidates.css';
import { listHeavenlymatchReportedCandidates } from '../../shared/api/candidates';
import HeavenlyMatchTable from '../../shared/Table/HeavenlyMatchTable';
import InviteCandidateModal from '../InviteCandidateModal/InviteCandidateModal';
import { useNavigate } from 'react-router-dom';
import { isMobileScreen } from '../../utilities';
import { GroupType } from '../../enum';
import ViewReportReason from '../ViewReportReason/ViewReportReason';

const ReportedCandidates = () => {
  const mobileScreen = isMobileScreen();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const navigate = useNavigate();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const onView = async (record) => {
    window.localStorage.setItem('reportedRecord', JSON.stringify(record));
    navigate(`candidate-details/candidate-about-me/${record.reportedUserId}`);
  };

  const reasonView = async (record) => {
    setIsReasonModalOpen(true);
    setReason(record.reportedReason);
  };

  // Fetching team member column list.
  const columns = teamConfig(onView, reasonView);
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
      const response = await listHeavenlymatchReportedCandidates();
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
      item.reportedUser?.firstName
        .toLowerCase()
        ?.includes(searchValue.toLowerCase()) ||
      item.reportedUser?.lastName
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase()) ||
      item.reportedUser?.email
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase()) ||
      item.reportedUser?.displayName
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase()) ||
      item.reportedByUser?.displayName
        ?.toLowerCase()
        ?.includes(searchValue.toLowerCase())
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
          <ViewReportReason
            title={'Reason for Report'}
            isModalOpen={isReasonModalOpen}
            setIsModalOpen={setIsReasonModalOpen}
            reportReason={reason}
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

export default ReportedCandidates;
