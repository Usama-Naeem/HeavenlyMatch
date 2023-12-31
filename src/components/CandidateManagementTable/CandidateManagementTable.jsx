import { Form, Button, Input, Popover } from 'antd';
import {
  FunnelPlotOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { teamConfig } from './CandidateManagementTableConfig';
import './CandidateManagementTable.css';
import { listHeavenlymatchApprovedCandidates } from '../../shared/api/candidates';
import HeavenlyMatchTable from '../../shared/Table/HeavenlyMatchTable';
import InviteCandidateModal from '../InviteCandidateModal/InviteCandidateModal';
import AuthContext from '../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isMobileScreen } from '../../utilities';
import {
  ALL,
  EXCLUDED_FROM_PAYMENT,
  FILTER_LABEL,
  FREE_CANDIDATE,
  GroupType,
  PAID_CANDIDATE,
} from '../../enum';
import { ABOUT_ME } from '../../shared/routes';
import FilterPaymentTypography from '../../shared/components/FilterPaymentTypography/FilterPaymentTypography';

const CandidateManagementTable = ({ activeTabKey }) => {
  const mobileScreen = isMobileScreen();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const [paymentFilteredDataSource, setPaymentFilteredDataSource] =
    useState(dataSource);
  const [serachFilteredDataSource, setSerachFilteredDataSource] =
    useState(dataSource);
  const [isPaymentFilter, setIsPaymentFilter] = useState(false);
  const [isSearchFilter, setIsSearchFilter] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // Fetching data from dynamo
  useEffect(() => {
    if (activeTabKey !== 'candidates') {
      setFilterTitle(null);
      setIsPaymentFilter(false);
      setPaymentFilteredDataSource(null);
    }
  }, [activeTabKey]);

  const content = (
    <div>
      <FilterPaymentTypography
        label={PAID_CANDIDATE}
        onClick={() => {
          const filteredData = dataSource?.filter(
            (item) => item.paymentExclusion === false && item.isPaid === true
          );
          setFilterTitle(PAID_CANDIDATE);
          setPaymentFilteredDataSource(filteredData);
          setIsSearchFilter(false);
          setIsPaymentFilter(true);
          setOpen(false);
        }}
      />
      <FilterPaymentTypography
        label={EXCLUDED_FROM_PAYMENT}
        onClick={() => {
          const filteredData = dataSource?.filter(
            (item) => item.paymentExclusion === true && item.isPaid === false
          );
          setFilterTitle(EXCLUDED_FROM_PAYMENT);
          setPaymentFilteredDataSource(filteredData);
          setIsSearchFilter(false);
          setIsPaymentFilter(true);
          setOpen(false);
        }}
      />
      <FilterPaymentTypography
        label={FREE_CANDIDATE}
        onClick={() => {
          const filteredData = dataSource?.filter(
            (item) => item.paymentExclusion === false && item.isPaid === false
          );
          setFilterTitle(FREE_CANDIDATE);
          setPaymentFilteredDataSource(filteredData);
          setIsSearchFilter(false);
          setIsPaymentFilter(true);
          setOpen(false);
        }}
      />
      <FilterPaymentTypography
        label={ALL}
        onClick={() => {
          setFilterTitle(ALL);
          setPaymentFilteredDataSource(dataSource);
          setIsSearchFilter(false);
          setIsPaymentFilter(true);
          setOpen(false);
        }}
      />
    </div>
  );

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const onView = (record) => {
    window.localStorage.setItem('userDynamo', JSON.stringify(record));
    authContext.setUserDynamo(record);
    navigate(ABOUT_ME(record.id));
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
      const response = await listHeavenlymatchApprovedCandidates();
      setDataSource(response);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw Error(err.message);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (!paymentFilteredDataSource) {
      const filteredData = dataSource.filter(
        (item) =>
          item.status?.toLowerCase().includes(searchValue) ||
          item.role?.toLowerCase().includes(searchValue) ||
          item.firstName?.toLowerCase().includes(searchValue) ||
          item.lastName?.toLowerCase().includes(searchValue) ||
          item.phoneNumber?.toLowerCase().includes(searchValue) ||
          item.email?.toLowerCase().includes(searchValue) ||
          item.username?.toLowerCase().includes(searchValue)
      );
      setSerachFilteredDataSource(filteredData);
      setIsSearchFilter(true);
      setIsPaymentFilter(false);
    } else {
      const filteredData = paymentFilteredDataSource.filter(
        (item) =>
          item.status?.toLowerCase().includes(searchValue) ||
          item.role?.toLowerCase().includes(searchValue) ||
          item.firstName?.toLowerCase().includes(searchValue) ||
          item.lastName?.toLowerCase().includes(searchValue) ||
          item.phoneNumber?.toLowerCase().includes(searchValue) ||
          item.email?.toLowerCase().includes(searchValue) ||
          item.username?.toLowerCase().includes(searchValue)
      );
      setSerachFilteredDataSource(filteredData);
      setIsSearchFilter(true);
      setIsPaymentFilter(false);
    }
  };
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
              onChange={handleSearch}
            />

            {/* Filter */}
            <div className="flex gap-1">
              <div id="actionButtons">
                <Popover
                  placement="bottom"
                  content={content}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button
                    type="primary"
                    className="flex items-center justify-center bg-lightburgundy rounded-full hover:bg-black"
                    icon={<FunnelPlotOutlined />}
                  >
                    {filterTitle === null ? FILTER_LABEL : filterTitle}
                  </Button>
                </Popover>
              </div>

              {currentUserGroup?.includes(GroupType.SUPER_ADMIN) ? (
                <Button
                  type="primary"
                  shape="round"
                  className="bg-lightburgundy"
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
          </div>
          <InviteCandidateModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title={'Invite Candidate'}
          />
          <HeavenlyMatchTable
            columns={mergedColumns}
            dataSource={
              isPaymentFilter
                ? paymentFilteredDataSource
                : isSearchFilter
                ? serachFilteredDataSource
                : dataSource
            }
            rowClassName="editable-row heaven-red"
            loading={isLoading}
          />
        </div>
      </div>
    </Form>
  );
};

export default CandidateManagementTable;
