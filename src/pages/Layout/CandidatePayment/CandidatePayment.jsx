import React, { useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import { Image } from 'antd';
import { isMobileScreen } from '../../../utilities';
import HeavenlyMatchTable from '../../../shared/Table/HeavenlyMatchTable';
import { candidatePaymentConfig } from './candidatePaymentConfig';
import { useParams } from 'react-router-dom';
import { getHeavenlyMatchUser } from '../../../shared/api/candidates';

const CandidatePayment = () => {
  const mobileScreen = isMobileScreen();
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const userData = await getHeavenlyMatchUser(id);
        setData(userData);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      fetchData();
    })();
  }, [data]);

  const fetchData = () => {
    try {
      if (!data) {
        return;
      }
      const values = {
        key: data?.userPayments.id,
        paymentType: data?.userPayments.paymentType,
        paymentAmount: '$' + data?.userPayments.paymentAmount,
        date: new Date(data?.userPayments.createdAt)
          .toDateString()
          .split(' ')
          .splice(1)
          .join('-'),
      };
      const rawData = [values];
      setDataSource(rawData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const columns = candidatePaymentConfig();
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
  return (
    <Layout>
      {data !== null && <CandidateAboutMeHeader data={data} />}
      <Content className={` p-2 lg:p-10 ${mobileScreen && 'mt-5 mb-20'} `}>
        <div
          id="candidateWork"
          className={`font-medium w-full h-full bg-white rounded-3xl lg:p-12 p-4 ${
            mobileScreen && 'mb-10'
          }`}
        >
          {data !== null && !data.isPaid ? (
            <>
              <div className="flex justify-between mb-12 xl:ml-20  ">
                <h1 className=" font-medium font-sans text-xl ">Payment</h1>
              </div>
              <div className="flex justify-center ">
                <div className="flex flex-col">
                  <Image width="200px" src="/no-money.svg" preview={false} />
                  <span className="self-center " style={{ color: 'grey' }}>
                    No payment yet
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <div className="flex justify-between mb-12">
                <h1 className=" font-medium font-sans text-xl ">Payment</h1>
              </div>
              <HeavenlyMatchTable
                columns={mergedColumns}
                dataSource={dataSource}
                rowClassName="editable-row heaven-red"
              />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default CandidatePayment;
