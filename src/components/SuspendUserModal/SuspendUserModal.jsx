import React, { useState } from 'react';
import FormModal from '../../shared/components/FormModal/FormModal';
import TextArea from 'antd/es/input/TextArea';
import SimpleButton from '../../shared/components/SimpleButton/SimpleButton';
import { message } from 'antd';
import {
  deleteReportedUserRecordFromDynamo,
  suspendReportedUser,
} from '../../shared/api/candidates';
import { candidateStatusTypes } from '../../enum';
import { CANDIDATE_MANAGEMENT } from '../../shared/routes';
import { useNavigate } from 'react-router-dom';
import { SUSPEND_USER_PROFILE_MESSAGE } from '../../utilities';

const SuspendUserModal = ({
  isSuspensionModalOpen,
  setIsSuspensionModalOpen,
  title,
  userData,
}) => {
  const [suspensionLoading, setSuspensionLoading] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState(false);
  const navigate = useNavigate();
  const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;

  const suspendUser = async () => {
    // throw warning if rejection reason is null
    if (!suspensionReason) {
      message.warning('Please enter a valid reason', [2]);
      return;
    }
    // SUSPEND USER FROM COGNITO
    if (suspensionReason && userData.isReported === true) {
      const reportRecord = JSON.parse(localStorage.getItem('reportedRecord'));
      setSuspensionLoading(true);
      try {
        const updateText = {
          id: userData.id,
          status: candidateStatusTypes.SUSPENDED,
          isReported: false,
        };
        await suspendReportedUser(
          suspensionReason,
          userData,
          updateText,
          USER_POOL_ID
        );
        await deleteReportedUserRecordFromDynamo(reportRecord?.reportedUserId);
        // send email to user about his/her accounct suspension and also disable user from cognito and place inside candidate tab with Suspend status
        setIsSuspensionModalOpen(false);
        navigate(CANDIDATE_MANAGEMENT);
        setSuspensionLoading(false);
        message.success(SUSPEND_USER_PROFILE_MESSAGE, [3]);
      } catch (error) {
        setIsSuspensionModalOpen(false);
        setSuspensionLoading(false);
        throw new Error(error.message);
      }
    }
  };

  return (
    <div>
      <FormModal
        title={title}
        setIsModalOpen={setIsSuspensionModalOpen}
        isModalOpen={isSuspensionModalOpen}
        width={450}
      >
        <div className="pt-4">
          <TextArea
            name="candidateSuspension"
            rows={3}
            className="mt-1"
            maxLength={300}
            placeholder={'Enter the suspension reason here'}
            onChange={(e) => {
              setSuspensionReason(e.target.value);
            }}
          />
          <div className="flex mt-10 items-center justify-center gap-x-6">
            <SimpleButton
              loading={suspensionLoading}
              label="Submit Reason"
              className="text-white bg-lightburgundy font-normal rounded-full text-base no-underline h-9"
              onClick={suspendUser}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default SuspendUserModal;
