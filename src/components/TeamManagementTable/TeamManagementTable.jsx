import { Form, Button, Input, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { teamConfig } from './TeamManagementTableConfig';
import './TeamManagementTable.css';
import TeamManagementModal from './TeamManagementModal';
import {
  getArchiveAminTableData,
  getNonArchiveAminTableData,
  updateUser,
} from '../../shared/api/teamMember';
import { updateHeavenlymatchAdmin } from '../../graphql/mutations';
import HeavenlyMatchTable from '../../shared/Table/HeavenlyMatchTable';
import { isMobileScreen } from '../../utilities';
import {
  cognitoUpdateGroup,
  enableSuspendedUser,
  suspendUser,
} from '../../shared/api/cognito';
import { GroupType, userStatusTypes } from '../../enum';
const TeamManagementTable = (props) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(null);
  const [editingKey, setEditingKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRecord, setCurrentRecord] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const tabKey = props.activeTabKey;
  const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
  const { isFieldTouched } = form;

  // Fetching data from dynamo
  useEffect(() => {
    (async () => {
      await fetchTeam();
    })();
  }, [tabKey, updateTable]);

  // This function fetches team member details from DynamoDB and sets it in the table.
  const fetchTeam = async (value) => {
    try {
      setIsLoading(true);
      if (tabKey === 'activeSuspendedUsers') {
        const response = await getNonArchiveAminTableData();
        setDataSource(response);
      } else {
        const response = await getArchiveAminTableData();
        setDataSource(response);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error[0].message);
    }
  };
  // Function to search user by role or status
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = dataSource?.filter(
    (item) =>
      item.status?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.role?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.firstName?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.lastName?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.phoneNumber?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.email?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
      item.username?.toLowerCase()?.includes(searchValue.toLowerCase())
  );

  // This function saves the team member information in DynamoDB.
  const saveTeamMember = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      // Edit case - The index against the user already exists.
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        await editTeamMember(row);
        setDataSource(newData);
      }
      setUpdateTable(!updateTable);
      setEditingKey('');
    } catch (error) {
      throw new Error(error);
    }
  };

  // This function edits the team member on save click.
  const editTeamMember = async (record) => {
    try {
      setIsLoading(true);
      // Update user - Update User details in dynamo
      const userDetails = {
        id: currentRecord.id,
        firstName: record.firstName,
        lastName: record.lastName,
        role: record.role,
        status: record.status,
      };
      const isStatusTouched = isFieldTouched('status');
      const isRoleTouched = isFieldTouched('role');

      if (isStatusTouched) {
        if (
          userDetails.status === userStatusTypes.ARCHIVE ||
          userDetails.status === userStatusTypes.SUSPENDED
        ) {
          // check if userDetails.status is suspend or archeived then run this function
          // disable user from cognito
          await suspendUser(currentUser, USER_POOL_ID);
        }
        // check if userDetails.status is active then run this function
        if (userDetails.status === userStatusTypes.ACTIVE) {
          // disable user from cognito
          await enableSuspendedUser(currentUser, USER_POOL_ID);
        }
      }

      if (isRoleTouched) {
        //change role from vol to admin
        if (userDetails.role === GroupType.SUPER_ADMIN) {
          // currentGroup, newGroup, email, userPoolId;
          await cognitoUpdateGroup(
            GroupType.VOLUNTEER,
            userDetails.role,
            currentRecord.email,
            USER_POOL_ID
          );
        }
        //change role from admin to volunteer
        if (userDetails.role === GroupType.VOLUNTEER) {
          await cognitoUpdateGroup(
            GroupType.SUPER_ADMIN,
            userDetails.role,
            currentRecord.email,
            USER_POOL_ID
          );
        }
      }
      await updateUser(userDetails, updateHeavenlymatchAdmin);
      await fetchTeam();
      setIsLoading(false);
      message.success('User details are successfully updated', [4]);
      // Refreshing the team list.
    } catch (error) {
      setIsLoading(false);
      throw new Error(error.errors[0].message);
    }
  };

  // This function enables the editing mode for the selected record.
  const onEdit = (record) => {
    setCurrentUser(record);
    form.setFieldsValue({
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      phoneNumber: '',
      status: '',
      ...record,
    });
    setEditingKey(record.key);
    setCurrentRecord(record);
  };

  // This function cancels the editing mode.
  const onCancel = () => {
    setEditingKey('');
  };

  // This function soft deletes a team members.
  const softDeleteTeamMember = async (record) => {
    try {
      setIsLoading(true);

      setIsLoading(false);
    } catch (error) {
      // Condition - If cognitoDisableUser is resolved but softDeleteAdmin is rejected.

      // Add condition based on response elements.
      setIsLoading(false);
      throw new Error(error);
    }
  };

  // Fetching team member column list.
  const columns = teamConfig(
    editingKey,
    saveTeamMember,
    onCancel,
    onEdit,
    softDeleteTeamMember
  );

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
        editing: record.key === editingKey,
      }),
    };
  });

  const mobileScreen = isMobileScreen();
  return (
    <Form form={form} component={false}>
      <div id="teamManegementTable">
        <div>
          <div
            className={`flex ${
              !mobileScreen ? 'justify-between' : 'flex-col-reverse'
            } mb-2`}
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
            <Button
              type="primary"
              shape="round"
              onClick={() => setIsModalOpen(true)}
              icon={<PlusOutlined style={{ verticalAlign: '1px', width: 7 }} />}
              className="w-[170px] self-end mb-[15px]"
            >
              Invite Team Member
            </Button>
          </div>
          <HeavenlyMatchTable
            columns={mergedColumns}
            dataSource={filteredData}
            rowClassName="editable-row heaven-red"
            loading={isLoading}
          />
          <TeamManagementModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            fetchUserDetails={fetchTeam}
          />
        </div>
      </div>
    </Form>
  );
};

export default TeamManagementTable;
