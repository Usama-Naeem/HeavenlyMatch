import React from 'react';
import FormModal from '../../shared/components/FormModal/FormModal';
import { cleanedData } from '../../shared/api/candidates';
const ViewAnnouncement = ({ isModalOpen, setIsModalOpen, title, data }) => {
  return (
    <div>
      <FormModal
        title={title}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div>
          <div className="header py-3">
            <h1 className="text-lg font-medium">Announcement For:</h1>
            <span className="text-sm">
              {cleanedData(data?.announcementsFor)}
            </span>
          </div>
          <div className="text-base font-normal">{data?.announcementsText}</div>
        </div>
      </FormModal>
    </div>
  );
};

export default ViewAnnouncement;
