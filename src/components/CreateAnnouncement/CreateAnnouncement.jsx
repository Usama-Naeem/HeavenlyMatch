import React, { useState } from 'react';
import FormModal from '../../shared/components/FormModal/FormModal';
import { Form, message } from 'antd';
import ModalSubmitButton from '../../shared/components/ModalSumbitButton/ModalSubmitButton';
import CheckboxInput from '../../shared/components/CheckboxInput/CheckboxInput';
import {
  AnnoucementType,
  AnnouncementType,
  GroupType,
  announcementForOptions,
} from '../../enum';
import TextAreaInput from '../../shared/components/TextAreaInput/TextAreaInput';
import {
  createAnnouncement,
  listHeavenlymatchFemaleCandidatesEmail,
  sendAnnouncementNotification,
  sendEmailsToMultipleUsers,
} from '../../shared/api/announcements';
import { ANNOUNCEMENT_SUCCESS } from '../../shared/constant/success';
import {
  ANNOUNCEMENT,
  ANNOUNCEMENT_WARNING,
  NEW_ANNOUNCEMENT,
} from '../../utilities';
const CreateAnnouncement = ({
  isModalOpen,
  setIsModalOpen,
  title,
  fetchUserDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [announceFor, setAnnounceFor] = useState(null);
  const [announceType, setAnnounceType] = useState(null);

  const onCheckboxChange = (checkedValues) => {
    setAnnounceFor(checkedValues);
  };
  const onTypeCheckboxChange = (checkedValues) => {
    setAnnounceType(checkedValues);
  };

  const handleFormSubmit = async (values) => {
    if (
      !values.announcementsText ||
      (announceFor?.length ?? 0) < 1 ||
      (announceType?.length ?? 0) < 1
    ) {
      message.error(ANNOUNCEMENT_WARNING, [3]);
      return;
    }
    setIsLoading(true);
    try {
      // api to create new announcements
      await createAnnouncement(announceFor, announceType, values);
      // send email notification to selected recipients if announcement type is email
      if (announceType.includes(AnnouncementType.EMAIL)) {
        await sendEmailsToMultipleUsers(announceFor, values.announcementsText);
      }
      if (
        announceType.includes(AnnouncementType.IN_APP) &&
        (announceFor.includes(GroupType.MALE_CANDIDATE) ||
          announceFor.includes(GroupType.FEMALE_CANDIDATE))
      ) {
        await listHeavenlymatchFemaleCandidatesEmail();
        // call lambda function here to send mobile notifications
        await sendAnnouncementNotification(
          ANNOUNCEMENT,
          NEW_ANNOUNCEMENT,
          values.announcementsText,
          announceFor
        );
      }
      await fetchUserDetails();
      message.success(ANNOUNCEMENT_SUCCESS, [4]);
      setIsModalOpen(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      message.error(err.message);
      throw new Error(err.message);
    }
  };

  return (
    <div>
      <FormModal
        title={title}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        width={450}
      >
        <div className="pt-[20px]">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <CheckboxInput
              name="announcementsType"
              label="Announcement Type"
              onChange={onTypeCheckboxChange}
              options={AnnoucementType}
              className="flex flex-col"
            />
            <CheckboxInput
              name="announcementsFor"
              label="Announcement For?"
              onChange={onCheckboxChange}
              options={
                announceType?.includes(AnnouncementType.IN_APP) &&
                !announceType?.includes(AnnouncementType.EMAIL)
                  ? announcementForOptions.filter(
                      (el) =>
                        el.value !== GroupType.ADMIN &&
                        el.value !== GroupType.VOLUNTEER
                    )
                  : announcementForOptions
              }
              className="flex flex-col"
            />
            <TextAreaInput
              name="announcementsText"
              label="Announcement Text"
              rows={4}
              maxLength={700}
            />
            <ModalSubmitButton
              loading={isLoading}
              label="Publish"
              className="w-full text-white bg-lightburgundy mt-[20px] h-[45px] font-normal rounded-full text-base no-underline"
            />
          </Form>
        </div>
      </FormModal>
    </div>
  );
};

export default CreateAnnouncement;
