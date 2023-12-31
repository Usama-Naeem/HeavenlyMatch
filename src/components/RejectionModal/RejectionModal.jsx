import React, { useEffect, useState } from 'react';
import FormModal from '../../shared/components/FormModal/FormModal';
import TextArea from 'antd/es/input/TextArea';
import SimpleButton from '../../shared/components/SimpleButton/SimpleButton';
import {
  PROFILE,
  PROFILE_CHANGES_APPROVED,
  PROFILE_CHANGES_REJECTED,
  PROFILE_UPDATE_APPROVED,
  PROFILE_UPDATE_REJECTED,
  isMobileScreen,
} from '../../utilities';
import { message } from 'antd';
import {
  approveUserBioChanges,
  getCandidateProfileImages,
  rejectUserBioChanges,
  rejectUserProfileChanges,
  sendProfileUpdateApprovedNotification,
  sendProfileUpdateRejectedNotification,
  updateUser,
} from '../../shared/api/candidates';
import {
  updateHeavenlymatchUserMediaFiles,
  updateHeavenlymatchUsers,
} from '../../graphql/mutations';
import {
  sendImageApprovalEmailTemplate,
  sendImageRejectionEmailTemplate,
} from '../../shared/api/email';
import { EmailTemplates } from '../../shared/enum/email';
import {
  candidateModerationStatus,
  candidateModerationTypes,
} from '../../enum';
import { useNavigate } from 'react-router-dom';
import { CANDIDATE_MANAGEMENT } from '../../shared/routes';

const RejectionModal = ({
  isBioRejectionModalOpen,
  setIsBioRejectionModalOpen,
  title,
  fetchUserDetails,
  user,
}) => {
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [rejectionLoading, setRejectionLoading] = useState(false);
  const [paths, setPaths] = useState(null);
  const [rejectionReason, setRejectionReason] = useState(null);
  const mobileScreen = isMobileScreen();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await showImages();
    })();
  }, [isBioRejectionModalOpen]);

  // getImages from s3 bucket using fileName
  const showImages = async () => {
    try {
      const tempPaths = [];
      const images = user?.userMediaFiles;
      // if images object contains id then run this code
      if (
        images &&
        user?.imageModerationType === candidateModerationTypes.PICCHANGE
      ) {
        // swap image with cover true at index 0
        for (const image of images) {
          // get userImage from S3
          const response = await getCandidateProfileImages(image.replacedKey);
          tempPaths.push({
            s3Key: response,
            filePath: image.replacedKey,
            fileId: image.id,
          });
        }
        setPaths(tempPaths);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const rejectRequest = async () => {
    // throw warning if rejection reason is null
    if (!rejectionReason) {
      message.warning('Please enter a valid reason', [2]);
      return;
    }
    // REJECT BIO CHANGE
    if (
      rejectionReason &&
      user?.bioModerationType === candidateModerationTypes.BIOUPDATE
    ) {
      setRejectionLoading(true);
      try {
        const updateText = {
          id: user?.id,
          bioApproved: candidateModerationStatus.REJECTED,
          bioModerationType: '',
          userNewBio: '',
        };
        await rejectUserBioChanges(user, rejectionReason, updateText);
        // Send notification on mobile
        await sendProfileUpdateRejectedNotification(
          PROFILE,
          PROFILE_CHANGES_REJECTED,
          PROFILE_UPDATE_REJECTED,
          user?.id
        );
        await fetchUserDetails();
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setRejectionLoading(false);
        message.success('User Bio is rejected successfully', [3]);
      } catch (error) {
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setRejectionLoading(false);
        throw new Error(error.message);
      }
    }

    //  REJECT PICTURE CHANGE
    if (
      rejectionReason &&
      user?.imageModerationType === candidateModerationTypes.PICCHANGE
    ) {
      setRejectionLoading(true);
      try {
        // check if userMediaFiles has replacedKey or not
        for (const image of user?.userMediaFiles) {
          if (image.replacedKey === '') {
            // update Images table
            const updateImagesTable = {
              id: image.id,
              approved: candidateModerationStatus.REJECTED,
            };
            await updateUser(
              updateImagesTable,
              updateHeavenlymatchUserMediaFiles
            );
          } else {
            // update Images table
            const updateImagesTable = {
              id: image.id,
              approved: candidateModerationStatus.REJECTED,
              file: image.file,
              replacedKey: '',
            };
            await updateUser(
              updateImagesTable,
              updateHeavenlymatchUserMediaFiles
            );
          }
        }
        // update User table
        const updateUserTable = {
          id: user?.id,
          imagesApproved: candidateModerationStatus.REJECTED,
          imageModerationType: '',
        };
        await updateUser(updateUserTable, updateHeavenlymatchUsers);
        // send emails
        // commented this line of code due to ses issues
        await sendImageRejectionEmailTemplate(
          [user?.email.toLowerCase()],
          EmailTemplates.IMAGE_UPDATE_REJECTION,
          `${user.firstName} ${user.lastName}`,
          rejectionReason
        );
        // Send picture change rejected notification on mobile
        await sendProfileUpdateRejectedNotification(
          PROFILE,
          PROFILE_CHANGES_REJECTED,
          PROFILE_UPDATE_REJECTED,
          user?.id
        );
        await fetchUserDetails();
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setRejectionLoading(false);
        message.success('User images are rejected successfully', [3]);
      } catch (error) {
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setRejectionLoading(false);
        throw new Error(error.message);
      }
    }

    //  REJECT NEW PROFILE
    if (
      rejectionReason &&
      user?.moderationType === candidateModerationTypes.NEWPROFILE
    ) {
      setRejectionLoading(true);
      try {
        const updateText = {
          id: user?.id,
          isNewProfile: false,
          newProfileApproved: candidateModerationStatus.REJECTED,
          moderationType: '',
        };
        await rejectUserProfileChanges(user, rejectionReason, updateText);
        navigate(CANDIDATE_MANAGEMENT);
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setRejectionLoading(false);
        message.success('User profile is rejected successfully', [3]);
      } catch (error) {
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setRejectionLoading(false);
        throw new Error(error.message);
      }
    }
  };

  const approveRequest = async () => {
    // throw warning if rejection reason is null
    if (rejectionReason) {
      message.warning(
        'Please remove the rejection reason before approving the user.'
      );
      return;
    }
    // APPROVE BIO CHANGE
    if (
      !rejectionReason &&
      user?.bioModerationType === candidateModerationTypes.BIOUPDATE
    ) {
      setApprovalLoading(true);
      try {
        // if admin approved user bio then swap old bio with new one and set newUserBio to empty
        const updateText = {
          id: user?.id,
          bioApproved: candidateModerationStatus.APPROVED,
          userOldBio: user?.userNewBio,
          userNewBio: '',
          bioModerationType: '',
        };
        await approveUserBioChanges(user, updateText);
        // Send bio change approved notification on mobile
        await sendProfileUpdateApprovedNotification(
          PROFILE,
          PROFILE_CHANGES_APPROVED,
          PROFILE_UPDATE_APPROVED,
          user?.id
        );
        await fetchUserDetails();
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setApprovalLoading(false);
        message.success('User Bio is approved successfully', [3]);
      } catch (error) {
        setRejectionReason(null);
        setIsBioRejectionModalOpen(false);
        setApprovalLoading(false);
        throw new Error(error.message);
      }
    }
    // APPROVE PICTURE CHANGE
    if (
      !rejectionReason &&
      user?.imageModerationType === candidateModerationTypes.PICCHANGE
    ) {
      setApprovalLoading(true);
      try {
        // check if userMediaFiles has replacedKey or not
        for (const image of user?.userMediaFiles) {
          if (image.replacedKey === '') {
            // update Images table if user add a new picture
            const updateImagesTable = {
              id: image.id,
              approved: candidateModerationStatus.APPROVED,
            };
            await updateUser(
              updateImagesTable,
              updateHeavenlymatchUserMediaFiles
            );
          } else {
            // update Images table if user update a picture
            const updateImagesTable = {
              id: image.id,
              approved: candidateModerationStatus.APPROVED,
              file: image.replacedKey,
              replacedKey: '',
            };
            await updateUser(
              updateImagesTable,
              updateHeavenlymatchUserMediaFiles
            );
          }
        }
        // update User table
        const updateUserTable = {
          id: user?.id,
          imagesApproved: candidateModerationStatus.APPROVED,
          imageModerationType: '',
        };
        await updateUser(updateUserTable, updateHeavenlymatchUsers);
        // send emails
        // commented this line of code due to ses issues
        await sendImageApprovalEmailTemplate(
          [user.email.toLowerCase()],
          EmailTemplates.IMAGE_UPDATE_APPROVAL,
          `${user.firstName} ${user.lastName}`
        );
        await sendProfileUpdateApprovedNotification(
          PROFILE,
          PROFILE_CHANGES_APPROVED,
          PROFILE_UPDATE_APPROVED,
          user?.id
        );
        await fetchUserDetails();
        setIsBioRejectionModalOpen(false);
        setApprovalLoading(false);
        message.success('User images are approved successfully', [3]);
      } catch (error) {
        setIsBioRejectionModalOpen(false);
        setApprovalLoading(false);
        throw new Error(error.message);
      }
    }
  };

  return (
    <>
      <FormModal
        title={title}
        setIsModalOpen={setIsBioRejectionModalOpen}
        isModalOpen={isBioRejectionModalOpen}
        setRejectionReason={setRejectionReason}
        width={
          user?.moderationType === candidateModerationTypes.NEWPROFILE
            ? 360
            : 650
        }
      >
        {user?.bioModerationType === candidateModerationTypes.BIOUPDATE ? (
          <p>{user?.userNewBio}</p>
        ) : user?.imageModerationType === candidateModerationTypes.PICCHANGE &&
          paths ? (
          <div className="flex items-center justify-evenly gap-1">
            {paths &&
              paths.map((item) => {
                return (
                  <div className={`rounded-lg  relative w-[180px]`}>
                    <img
                      key={item.s3Key}
                      src={item.s3Key}
                      alt={item.s3Key}
                      className={`object-cover ${
                        mobileScreen
                          ? 'w-[200px] h-[200px]'
                          : 'w-[135px] h-[135px]'
                      } rounded-2xl mb-10`}
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          ''
        )}

        <div className="pt-4">
          {user?.moderationType !== candidateModerationTypes.NEWPROFILE && (
            <span className="font-sans font-medium text-sm">
              Reason for Rejection
            </span>
          )}
          <TextArea
            name="candidateRejection"
            rows={2}
            className="mt-1"
            maxLength={300}
            label={'Reason for Rejection'}
            placeholder={'Enter the rejection reason here'}
            onChange={(e) => {
              setRejectionReason(e.target.value);
            }}
          />
          {user?.moderationType !== candidateModerationTypes.NEWPROFILE && (
            <div className="flex mt-10 items-center justify-center gap-x-6">
              <SimpleButton
                loading={rejectionLoading}
                label="Reject"
                className="text-black bg-white font-normal rounded-full text-base no-underline h-9 hover:bg-black border-lightGray"
                onClick={rejectRequest}
              />
              <SimpleButton
                loading={approvalLoading}
                label="Approve"
                className="text-white bg-lightburgundy font-normal rounded-full text-base no-underline h-9"
                onClick={approveRequest}
              />
            </div>
          )}
          {user?.moderationType === candidateModerationTypes.NEWPROFILE && (
            <div className="flex mt-10 items-center justify-center gap-x-6">
              <SimpleButton
                loading={rejectionLoading}
                label="Submit Reason"
                className="text-white bg-lightburgundy font-normal rounded-full text-base no-underline w-full"
                onClick={rejectRequest}
              />
            </div>
          )}
        </div>
      </FormModal>
    </>
  );
};

export default RejectionModal;
