import React from 'react';
import { Form, message } from 'antd';
import FormModal from '../../shared/components/FormModal/FormModal';
import ModalInput from '../../shared/components/ModalInput/ModalInput';
import FormSubmitButton from '../../shared/components/FormSubmitButton/FormSubmitButton';
import FormSelect from '../../shared/components/FormSelect/FormSelect';
import { TeamMemberRoles } from '../../enum/selectOptions';
import {
  addToCognitoGroup,
  createCognitoUser,
  enableUserMFA,
  deleteAdminFromCognito,
} from '../../shared/api/cognito';
import { FormRule } from '../../enum/formRules';
import {
  createDynamoUser,
  emailOrPhoneExist,
} from '../../shared/api/teamMember';
import { sendTeamMemberInviteEmail } from '../../shared/api/email';
import { randomStrings } from '../../utilities';

const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;

function TeamManagementModal({
  setIsModalOpen,
  isModalOpen,
  fetchUserDetails,
}) {
  const [isLoading, setIsloading] = React.useState(false);

  const submitHandler = async (values) => {
    setIsloading(true);
    try {
      const exist = await emailOrPhoneExist({
        email: values.email.toLowerCase(),
        phoneNumber: values.phoneNumber,
      });
      if (exist) {
        message.error('Email or phone number already exists', [5]);
        setIsloading(false);
        return;
      }
      const temporaryPassword = randomStrings()
      Promise.all([
        // Add user in dynamo
        await createCognitoUser(values, USER_POOL_ID, temporaryPassword),
        await addToCognitoGroup(values, USER_POOL_ID),
        await createDynamoUser(values),
        await sendTeamMemberInviteEmail(values.email.toLowerCase(),
          'INVITE_TEAM_MEMBER_TEMPLATE',
          values.firstName,
          values.email.toLowerCase(),
          temporaryPassword,
          process.env.REACT_APP_WEB_URL
          ),
        // await enableUserMFA(values, USER_POOL_ID),
      ]);
      message.success('Invite sent successfully', [4]);
      setIsModalOpen(false);
      setIsloading(false);
      await fetchUserDetails();
    } catch (err) {
      // if there's an error, then delete the user from cognito first
      setIsloading(false);
      await deleteAdminFromCognito(values, USER_POOL_ID);
      message.error(err.message);
      throw new Error(err.message);
    }
  };

  return (
    <>
      <FormModal
        title="Invite Team Member"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        width={400}
      >
        <Form className="mt-7" layout="vertical" onFinish={submitHandler}>
          <ModalInput
            label="First Name"
            name="firstName"
            rules={FormRule.FIRSTNAME}
            placeholder="Enter first name"
          />
          <ModalInput
            label="Last Name"
            name="lastName"
            rules={FormRule.LASTNAME}
            placeholder="Enter last name"
          />
          <ModalInput
            label="Phone Number"
            name="phoneNumber"
            rules={FormRule.PHONENUMBER}
            placeholder="+12423322423"
            maxLength={12}
          />
          <ModalInput
            rules={FormRule.EMAIL}
            label="Email"
            name="email"
            placeholder="test@test.com"
          />
          <FormSelect
            label="Role"
            name="role"
            placeholder="Select role"
            rules={FormRule.SELECT}
            options={TeamMemberRoles.ROLE}
            showSearch
          />
          <FormSubmitButton
            label="Send Invite"
            loading={isLoading}
            className="mt-6 w-full bg-lightburgundy hover:!bg-lightburgundy h-[40px] rounded-full"
          />
        </Form>
      </FormModal>
    </>
  );
}

export default TeamManagementModal;
