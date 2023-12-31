import {
  Badge,
  Button,
  ConfigProvider,
  Input,
  Layout,
  Modal,
  Spin,
  Tabs,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import {
  createNewRegisterAmmount,
  listHeavenlymatchRegistrationAmmount,
} from '../../../shared/api/payment';
import { paymentConfig } from './paymentTableConfig';
import HeavenlyMatchTable from '../../../shared/Table/HeavenlyMatchTable';
import {
  listHeavenlymatchExcludeFromPaymentsCandidates,
  listHeavenlymatchPaidCandidates,
  listHeavenlymatchPaymentFreeCandidates,
} from '../../../shared/api/candidates';
import { isMobileScreen } from '../../../utilities';

const { Content } = Layout;

const Payments = () => {
  const mobileScreen = isMobileScreen();
  const [isLoading, setIsLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActioveTab] = useState('1');
  const [excludedFromPaymentCount, setExcludedFromPaymentCount] =
    useState(null);
  const [freeUsersPaymentCount, setFreeUsersPaymentCount] = useState(null);
  const [excludedFromPaymentData, setExcludedFromPaymentData] = useState(null);
  const [paidUsersPaymentCount, setPaidUsersPaymentCount] = useState(null);
  const [freeUsersPaymentData, setFreeUsersPaymentData] = useState(null);
  const [paidUserData, setPaidUserData] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  // Add a flag to track if the data has been fetched
  const [dataFetched, setDataFetched] = useState(false);

  const setSelectedTab = (e) => {
    setActioveTab(e);
  };

  const columns = paymentConfig(activeTab);
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

  const handleFormSubmit = async () => {
    try {
      if (!price) {
        message.error('Please enter payment to update', [4]);
        return;
      }
      if (price == currentPayment) {
        message.error(
          'This payment already existed. Please add another amount',
          [4]
        );
        return;
      }
      setIsLoading(true);
      // update payment information
      await createNewRegisterAmmount(price);
      message.success('Payment is successfully updated', [4]);
      setPrice(null);
      setIsLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      setIsLoading(false);
      setIsModalOpen(false);
      throw new Error(error.message);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    (async () => {
      await fetchDataFromDB();
      // Set the flag to indicate that data has been fetched
      setDataFetched(true);
    })();
  }, []);

  // Fetching data from dynamo
  useEffect(() => {
    // Check if the data has been fetched
    if (dataFetched) {
      (async () => {
        await changeDataOnTabSwitch();
      })();
    }
  }, [activeTab, dataFetched]);

  // This function fetche payment details from DynamoDB and sets it in the table.
  const fetchDataFromDB = async () => {
    try {
      setTableLoading(true);
      const paidUser = await listHeavenlymatchPaidCandidates();
      const freeUser = await listHeavenlymatchPaymentFreeCandidates();
      const excludedFromPaymentUser =
        await listHeavenlymatchExcludeFromPaymentsCandidates();
      setPaidUserData(paidUser);
      setExcludedFromPaymentData(excludedFromPaymentUser);
      setExcludedFromPaymentCount(excludedFromPaymentUser?.length);
      setPaidUsersPaymentCount(paidUser?.length);
      setFreeUsersPaymentData(freeUser);
      setFreeUsersPaymentCount(freeUser?.length);
      setTableLoading(false);
    } catch (error) {
      setTableLoading(false);
      throw new Error(error);
    }
  };

  // This function fetche payment details from DynamoDB and sets it in the table.
  const changeDataOnTabSwitch = async (value) => {
    try {
      setTableLoading(true);
      if (activeTab === '1') {
        const data = paidUserData.map((el) => {
          return {
            ...el,
            paymentAmount: '$' + el.userPayments?.paymentAmount,
            paymentDate: new Date(el.userPayments?.createdAt)
              .toLocaleDateString('en-US')
              .replaceAll('/', '-'),
          };
        });
        setDataSource(data);
      } else if (activeTab === '2') {
        setDataSource(excludedFromPaymentData);
      } else {
        const data = freeUsersPaymentData.map((el) => {
          return {
            ...el,
            paymentAmount: '$0',
          };
        });
        setDataSource(data);
      }
      setTableLoading(false);
    } catch (error) {
      setTableLoading(false);
      throw new Error(error);
    }
  };
  // Function to search user by role or status
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = dataSource?.filter(
    (item) =>
      item.paymentAmount?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.paymentDate?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.firstName?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.lastName?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.phoneNumber?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.email?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.username?.toLowerCase()?.includes(searchValue.toLowerCase())
  );
  useEffect(() => {
    (async () => {
      const fetchPayments = await listHeavenlymatchRegistrationAmmount();
      setPaymentHistory(fetchPayments.slice(1, 4));
      setCurrentPayment(fetchPayments[0].registerAmmount);
    })();
  }, [isModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Edit Payment Fee"
        open={isModalOpen}
        width={400}
        closeIcon={
          <CloseCircleOutlined
            className="text-xl text-black"
            onClick={handleCancel}
          />
        }
        className="ant-modal-content"
      >
        <div className="flex flex-col ">
          {paymentHistory?.map((item, i) => (
            <div key={i} className="flex justify-between ml-4 mr-4">
              <span className="text-slate-400">
                Previous payment ${item.registerAmmount}
              </span>
              <span className="text-slate-400">
                {new Date(item?.createdAt)
                  .toLocaleDateString('en-US')
                  .replaceAll('/', '-')}
              </span>
            </div>
          ))}

          <hr className="ml-4 mr-4 mt-4" />
          <div className="w-[255px] lg:w-[320px] self-center mt-6 flex justify-between">
            <span>Current Payment Fee</span>
            <span>{'$' + currentPayment}</span>
          </div>
          <hr className="ml-4 mr-4 mt-4" />
          <div className="w-[255px] lg:w-[320px] self-center mt-6">
            <span>Update Payment</span>
            <Input
              className="w-[255px] lg:w-[320px] h-[40px] rounded-lg mt-2"
              placeholder="Enter Payment Fee"
              prefix={
                <img
                  src="/dollor.png"
                  alt="Dollar Sign Icon"
                  className="w-2.5"
                />
              }
              onChange={(e) => {
                if (e.target.value.match(/^\d{0,3}$/)) {
                  setPrice(e.target.value);
                }
              }}
              value={price}
            />
          </div>
          <div className="w-[255px] lg:w-[320px] self-center mt-6">
            <Button
              className="w-[255px] lg:w-[320px] h-[40px] rounded-full mt-6 mb-4 bg-[#cc5869] text-white "
              onClick={handleFormSubmit}
            >
              {isLoading ? <Spin /> : 'Update Fee'}
            </Button>
          </div>
        </div>
      </Modal>
      <Layout>
        <Header content="Payments" />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#CC5869',
            },
          }}
        >
          <div
            className={`relative flex ${mobileScreen && 'overflow-x-scroll'}`}
          >
            <Tabs
              className="pl-10 pt-10"
              defaultActiveKey="1"
              onChange={setSelectedTab}
            >
              <Tabs.TabPane
                tab={
                  <Badge
                    count={paidUsersPaymentCount}
                    color="#CC5869"
                    placement="start"
                    offset={[10, 0]}
                  >
                    <span className="text-sm text-lightburgundy">
                      Paid Users
                    </span>
                  </Badge>
                }
                key="1"
              />
              <Tabs.TabPane
                tab={
                  <Badge
                    count={excludedFromPaymentCount}
                    color="#CC5869"
                    placement="start"
                    offset={[13, 0]}
                  >
                    <span className="text-sm text-lightburgundy">
                      Excluded from Payment
                    </span>
                  </Badge>
                }
                key="2"
              />
              <Tabs.TabPane
                tab={
                  <Badge
                    count={freeUsersPaymentCount}
                    color="#CC5869"
                    placement="start"
                    offset={[10, 0]}
                    className="mr-6"
                  >
                    <span className="text-sm text-lightburgundy">
                      Free Users
                    </span>
                  </Badge>
                }
                key="3"
              />
            </Tabs>
          </div>
        </ConfigProvider>
        <Content className={`p-1 ${mobileScreen && 'pt-5 mb-20'}  lg:p-10`}>
          <div
            id="navDiv"
            className={`md:w-full md:h-full bg-white rounded-3xl lg:p-12 p-4 ${
              mobileScreen && 'mb-10'
            }`}
          >
            <div
              className={` flex mb-6 ${
                mobileScreen ? 'flex-col-reverse' : 'justify-between '
              }`}
            >
              <Input
                placeholder="Search Here"
                style={{
                  width: 'auto',
                }}
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={handleSearch}
              />
              <button
                className={` bg-[#CC5869] rounded-full h-[30px] text-white pl-2 pr-2 flex gap-2  ${
                  mobileScreen ? 'self-end' : 'self-center'
                }`}
                onClick={showModal}
              >
                <img src="/pen.svg" alt="penicon" className="self-center" />
                <span className="self-center">Edit Payment Fee</span>
              </button>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#CC5869',
                },
              }}
            >
              <HeavenlyMatchTable
                columns={mergedColumns}
                dataSource={filteredData}
                rowClassName="editable-row heaven-red"
                loading={tableLoading}
              />
            </ConfigProvider>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Payments;
