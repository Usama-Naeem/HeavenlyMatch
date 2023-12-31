import React from 'react';
import FormModal from '../../shared/components/FormModal/FormModal';
const ViewReportReason = ({
  isModalOpen,
  setIsModalOpen,
  title,
  reportReason,
}) => {
  return (
    <div>
      <FormModal
        title={title}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div>
          <div className="text-base font-normal">
            {reportReason}
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default ViewReportReason;
