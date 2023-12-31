import React, { useEffect, useState } from 'react';
import { Divider, message, Form, ConfigProvider, Spin } from 'antd';
import './CandidateAboutMeHeader.css';
import SimpleButton from '../../shared/components/SimpleButton/SimpleButton';
import { USER_APPROVED, USER_UPDATED } from '../../shared/constant/success';
import { listHeavenlymatcUser, updateUser } from '../../shared/api/teamMember';
import { updateHeavenlymatchUsers } from '../../graphql/mutations';
import {
  GroupType,
  acceptOrRejectOptions,
  adminActionTypes,
  candidateModerationStatus,
  candidateModerationTypes,
  candidateStatusTypes,
  dismissOrSuspendOptions,
  userStatusOptionsExceptInvite,
  userStatusTypes,
} from '../../enum';
import FormSwitch from '../../shared/components/Switch/FormSwitch';
import {
  ACCOUNT_APPROVED,
  PROFILE,
  PROFILE_APPROVED,
  isMobileScreen,
} from '../../utilities';
import RejectionModal from '../RejectionModal/RejectionModal';
import {
  deleteReportedUserRecordFromDynamo,
  dismissUserSuspendAction,
  getHeavenlyMatchUser,
  sendProfileApprovedNotification,
} from '../../shared/api/candidates';
import { useNavigate } from 'react-router-dom';
import { CANDIDATE_MANAGEMENT } from '../../shared/routes';
import SuspendUserModal from '../SuspendUserModal/SuspendUserModal';
import HeaderFormSelect from '../../shared/components/FormSelect/HeaderFormSelect';
import { enableSuspendedUser, suspendUser } from '../../shared/api/cognito';
import { listHeavenlymatchRegistrationAmmount } from '../../shared/api/payment';
import { API } from 'aws-amplify';
import {
  sendExcludedFromPaymentEmailAfterApproval,
  sendExcludedFromPaymentEmail,
} from '../../shared/api/email';
import { EmailTemplates } from '../../shared/enum/email';
const CandidateAboutMeHeader = ({ data }) => {
  const mobileScreen = isMobileScreen();
  const [loader, setLoader] = useState(true);
  const [isBioRejectionModalOpen, setIsBioRejectionModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSuspensionModalOpen, setIsSuspensionModalOpen] = useState(false);
  const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
  const currentUserGroup = JSON.parse(localStorage.getItem('userGroup'));
  const {
    id,
    firstName,
    lastName,
    email,
    birthday,
    userGeneralInfo,
    sect,
    paymentExclusion,
    isPaid,
    status,
    moderationType,
    bioModerationType,
    imageModerationType,
    isReported,
    gender,
    isNewProfile,
  } = data;
  if (userGeneralInfo) {
    var { height } = userGeneralInfo;
  }
  let membershipChange = false;
  const age = Math.floor(
    (new Date() - new Date(birthday)) / (365.25 * 24 * 60 * 60 * 1000)
  );
  const [check, setCheck] = useState(paymentExclusion);
  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState(status);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoader(true);
      if (id) {
        const getData = await getHeavenlyMatchUser(id);
        setCheck(getData?.paymentExclusion === true ? false : true);
        setUserStatus(getData.status);
      }
      if (isPaid && !paymentExclusion) {
        setIsDisabled(true);
      }
      setLoader(false);
    })();
  }, []);

  const onCheckChange = async (event) => {
    if (!event) {
      const editUser = {
        id: id,
        paymentExclusion: true,
        isPaid: false,
        paymentId: null,
      };
      await sendExcludedFromPaymentEmailAfterApproval(
        [email.toLowerCase()],
        EmailTemplates.EXCLUDED_FROM_PAYMENT_AFTER_APPROVE_TEMPLATE,
        `${firstName} ${lastName}`
      );
      await updateUser(editUser, updateHeavenlymatchUsers);
    } else {
      const editUser = {
        id: id,
        paymentExclusion: false,
        isPaid: false,
        paymentId: null,
      };
      membershipChange = true;
      await updateUser(editUser, updateHeavenlymatchUsers);
      await createSubscriptionAndSendInvoice(id, membershipChange);
    }
  };

  const onStatusChange = async (event) => {
    // check if event is suspend or archeived then run this function
    if (
      event === userStatusTypes.ARCHIVE ||
      event === userStatusTypes.SUSPENDED
    ) {
      // disable user from cognito
      const editUser = {
        id: id,
        status: event,
        isArchive: true,
      };
      await suspendUser(data, USER_POOL_ID);
      await updateUser(editUser, updateHeavenlymatchUsers);
    }
    // check if event is active then run this function
    if (event === userStatusTypes.ACTIVE) {
      const editUser = {
        id: id,
        status: event,
        isArchive: false,
      };
      // enable user from cognito
      await enableSuspendedUser(data, USER_POOL_ID);
      await updateUser(editUser, updateHeavenlymatchUsers);
    }
    message.success(USER_UPDATED, [4]);
  };

  const onAction = async (event) => {
    if (event === adminActionTypes.REJECT) {
      setIsBioRejectionModalOpen(true);
    } else if (event === adminActionTypes.APPROVE) {
      try {
        setIsLoading(true);
        const getData = await listHeavenlymatcUser(id);
        const paymentCheck = getData?.paymentExclusion;
        // admin approved user new profile
        const updateText = {
          id: data?.id,
          newProfileApproved: candidateModerationStatus.APPROVED,
          isNewProfile: false,
          moderationType: '',
          status: userStatusTypes.ACTIVE, // because of our check on action button, we also need to set this check to null so admin can see status button instead of action button after approving new profile
        };
        // check wheter a user is free candidate or paid candidate
        // Premium Users
        if (paymentCheck && !isPaid) {
          Promise.all([
            await updateUser(updateText, updateHeavenlymatchUsers),
            await sendExcludedFromPaymentEmail(
              [email.toLowerCase()],
              EmailTemplates.EXCLUDED_FROM_PAYMENT_TEMPLATE,
              `${firstName} ${lastName}`
            ),
          ]);
          // Free Users
        } else if (!paymentCheck && !isPaid) {
          membershipChange = false;
          Promise.all([
            await createSubscriptionAndSendInvoice(id, membershipChange),
            await updateUser(updateText, updateHeavenlymatchUsers),
          ]);
        }
        // Send notification on mobile
        await sendProfileApprovedNotification(
          PROFILE,
          ACCOUNT_APPROVED,
          PROFILE_APPROVED,
          id
        );
        message.success(USER_APPROVED, [3]);
        navigate(CANDIDATE_MANAGEMENT);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsBioRejectionModalOpen(false);
        throw new Error(error.message);
      }
    }
  };

  const onDismissOrSuspend = async (event) => {
    const reportRecord = JSON.parse(localStorage.getItem('reportedRecord'));
    if (event === candidateStatusTypes.SUSPENDED) {
      setIsSuspensionModalOpen(true);
    } else if (event === adminActionTypes.DISMISS) {
      try {
        setIsLoading(true);
        const findUserByEmail = await getHeavenlyMatchUser(
          reportRecord?.reportedByUserId
        );
        const reportedByUserEmail = findUserByEmail.email;
        const updateText = {
          id: id,
          isReported: false,
          status: candidateStatusTypes.ACTIVE,
        };
        await dismissUserSuspendAction(
          reportRecord,
          updateText,
          reportedByUserEmail
        );
        await deleteReportedUserRecordFromDynamo(reportRecord?.reportedUserId);
        message.success('Report is dismiss successfully', [3]);
        navigate(CANDIDATE_MANAGEMENT);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsSuspensionModalOpen(false);
        throw new Error(error.message);
      }
    }
  };

  const createSubscriptionAndSendInvoice = async (userId, membershipChange) => {
    const fetchPayments = await listHeavenlymatchRegistrationAmmount();
    try {
      await API.put('stripePayments', '/paySubscription', {
        queryStringParameters: {
          userId: userId,
          amount: fetchPayments[0].registerAmmount,
          membershipChange: membershipChange,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      {!loader ? (
        <Form
          className={`${
            mobileScreen && 'mt-5'
          } mx-1 mt-1 lg:mx-10 lg:mt-10 h-auto rounded-2xl bg-white`}
        >
          <div className="mx-1 mt-1  flex items-center justify-evenly bg-pureWhite flex-wrap">
            {mobileScreen && (
              <div
                id="saveButton"
                className="flex items-end mt-5 mr-2 w-full justify-end"
              >
                <SimpleButton
                  label="Save Changes"
                  className="bg-lightburgundy text-white"
                />
              </div>
            )}
            {mobileScreen && <hr className="w-[100%] mt-3 divide-slate-500" />}
            <div className="lg:my-4 lg:mx-4 flex flex-col items-start justify-start">
              <p className="text-textGray text-sm my-0 mt-0 mb-1">
                Candidate Name
              </p>
              <p className="text-base font-bold mb-1">{`${firstName} ${lastName}`}</p>
            </div>
            <Divider type="vertical" className="bg-gray-200 h-12" />
            <div className="lg:my-4 lg:mx-4 flex flex-col items-start justify-start">
              <p className="text-textGray text-sm my-0 mt-0 mb-1">Age</p>
              <p className="text-base font-bold mb-1">{age} y/o</p>
            </div>
            <Divider type="vertical" className="bg-gray-200 h-12" />
            <div className="lg:my-4 lg:mx-4 flex flex-col items-start justify-start">
              <p className="text-textGray text-sm my-0 mt-0 mb-1">Gender</p>
              <p className="text-base font-bold mb-1">
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </p>
            </div>
            <Divider type="vertical" className="bg-gray-200 h-12" />
            <div className="lg:my-4 lg:mx-4 flex flex-col items-start justify-start">
              <p className="text-textGray text-sm my-0 mt-0 mb-1">Height</p>
              <p className="text-base font-bold mb-1">{height} ft</p>
            </div>
            <Divider type="vertical" className="bg-gray-200 h-12" />
            <div className="my-4">
              <p className="text-textGray text-sm my-0 mt-0 mb-1">Sect</p>
              <p className="text-base font-bold mb-1">
                {sect || 'Not Present'}
              </p>
            </div>
            {mobileScreen && <hr className="w-[100%] divide-slate-500" />}
            {currentUserGroup?.includes(GroupType.SUPER_ADMIN) ? (
              <>
                <Divider type="vertical" className="bg-gray-200 h-12" />
                <div className="lg:my-4 lg:mx-4  flex flex-col items-start justify-start bg-red">
                  <p className="text-textGray text-sm my-0 mt-4">
                    Included In Payment
                  </p>
                  <p className="text-base font-bold mb-1">
                    <ConfigProvider
                      theme={{
                        components: {
                          Switch: {
                            colorPrimary: '#CC5869',
                            colorPrimaryHover: '#d27a85',
                          },
                        },
                      }}
                    >
                      <FormSwitch
                        defaultChecked={check}
                        disabled={isDisabled}
                        onChange={(e) => {
                          onCheckChange(e);
                        }}
                      />
                    </ConfigProvider>
                  </p>
                </div>
              </>
            ) : null}
            {/* SUSPEND OR ARCHIVE USER */}
            {currentUserGroup?.includes(GroupType.SUPER_ADMIN) &&
              moderationType !== candidateModerationTypes.NEWPROFILE &&
              isReported === false && (
                <>
                  <Divider type="vertical" className="bg-gray-200 h-12" />
                  <div
                    id="selectorDiv"
                    className={`lg:my-4 lg:mx-4 ${mobileScreen && 'flex'}`}
                  >
                    <p className="text-textGray text-sm my-0 mt-3 mb-1 mr-2">
                      Status
                    </p>
                    <HeaderFormSelect
                      defaultValue={userStatus || 'Select'}
                      style={{
                        maxWidth: 140,
                      }}
                      onChange={(e) => {
                        onStatusChange(e);
                      }}
                      options={userStatusOptionsExceptInvite}
                    />
                  </div>
                </>
              )}
            {/* APPROVE OR REJECT NEW PROFILE */}
            {currentUserGroup?.includes(GroupType.SUPER_ADMIN) &&
              moderationType === candidateModerationTypes.NEWPROFILE &&
              isNewProfile === true && (
                <>
                  <Divider type="vertical" className="bg-gray-200 h-12" />
                  <div
                    id="selectorDiv"
                    className={`lg:my-4 lg:mx-4 ${mobileScreen && 'flex'}`}
                  >
                    {!isLoading ? (
                      <>
                        <p className="text-textGray text-sm my-0 mt-3 mb-1 mr-2">
                          Action
                        </p>
                        <HeaderFormSelect
                          defaultValue={'Select'}
                          style={{
                            maxWidth: 120,
                          }}
                          onChange={(e) => {
                            onAction(e);
                          }}
                          options={acceptOrRejectOptions}
                        />
                      </>
                    ) : (
                      <Spin />
                    )}
                  </div>
                </>
              )}
            {/* SUSPEND OR DISMISS REPORTED USER PROFILE */}
            {currentUserGroup?.includes(GroupType.SUPER_ADMIN) &&
              moderationType !== candidateModerationTypes.NEWPROFILE &&
              isReported === true &&
              status === userStatusTypes.ACTIVE && (
                <>
                  <Divider type="vertical" className="bg-gray-200 h-12" />
                  <div
                    id="selectorDiv"
                    className={`lg:my-4 lg:mx-4 ${mobileScreen && 'flex'}`}
                  >
                    {!isLoading ? (
                      <>
                        <p className="text-textGray text-sm my-0 mt-3 mb-1 mr-2">
                          Action
                        </p>
                        <HeaderFormSelect
                          defaultValue={'Select'}
                          style={{
                            maxWidth: 120,
                          }}
                          onChange={(e) => {
                            onDismissOrSuspend(e);
                          }}
                          options={dismissOrSuspendOptions}
                        />
                      </>
                    ) : (
                      <Spin />
                    )}
                  </div>
                </>
              )}
          </div>
          <RejectionModal
            isBioRejectionModalOpen={isBioRejectionModalOpen}
            setIsBioRejectionModalOpen={setIsBioRejectionModalOpen}
            title={
              bioModerationType === candidateModerationTypes.BIOUPDATE
                ? 'Candidate Bio'
                : moderationType === candidateModerationTypes.NEWPROFILE
                ? 'Reason For Rejection'
                : imageModerationType === candidateModerationTypes.PICCHANGE
                ? 'Picture Change'
                : ''
            }
            user={data}
          />
          <SuspendUserModal
            isSuspensionModalOpen={isSuspensionModalOpen}
            setIsSuspensionModalOpen={setIsSuspensionModalOpen}
            title={'Reason For Suspension'}
            userData={data}
          />
        </Form>
      ) : (
        ''
      )}
    </>
  );
};

export default CandidateAboutMeHeader;
