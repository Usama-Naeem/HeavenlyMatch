import { Form, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getHeavenlyMatchUser,
  getRequestFromUserDetails,
  listMatchedCandidates,
} from '../../../shared/api/candidates';
import HeavenlyMatchTable from '../../../shared/Table/HeavenlyMatchTable';
import CandidateAboutMeHeader from '../../../components/CandidateAboutMeHeader/CandidateAboutMeHeader';
import { Content } from 'antd/es/layout/layout';
import { isMobileScreen } from '../../../utilities';
import { ABOUT_ME } from '../../../shared/routes';
import { useParams } from 'react-router-dom';
import { teamConfig } from './CandidateMatchesTableConfig';

const CandidateMatches = () => {
  const mobileScreen = isMobileScreen();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();

  const onView = (record) => {
    const aboutMeURL = ABOUT_ME(record.id);
    window.open(aboutMeURL, '_blank');
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
      // Get current user from db using id
      const userData = await getHeavenlyMatchUser(id);
      setData(userData);
      // It returns array of object of all matches from match table
      const getCurrentUserMatches = await listMatchedCandidates(id);
      const matchesData = getCurrentUserMatches.items;
      setDataSource(matchesData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw Error(err.message);
    }
  };

  return (
    <Layout>
      {data !== null && <CandidateAboutMeHeader data={data} />}
      <Content className={`p-1 ${mobileScreen && 'pt-5 mb-20'}  lg:p-10`}>
        <div
          id="navDiv"
          className={` md:w-full md:h-full bg-white rounded-3xl p-4 lg:p-12`}
        >
          <div className="mb-12 xl:ml-8">
            <h1 className=" font-medium font-sans text-xl">Matches</h1>
          </div>
          <Form form={form} component={false}>
            <div id="candidateManagementTable">
              <div>
                <HeavenlyMatchTable
                  columns={mergedColumns}
                  dataSource={dataSource}
                  rowClassName="editable-row heaven-red"
                  loading={isLoading}
                />
              </div>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default CandidateMatches;
