import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import './FormModal.css';
import { Modal } from 'antd';

function FormModal({
  isModalOpen,
  setIsModalOpen,
  children,
  title = '',
  handleCancel,
  bodyStyle,
  setIsReasonModalOpen = false,
  setIsDeleteModalOpen = false,
  setSuspensionLoading = false,
  setIsBioRejectionModalOpen = false,
  width,
  setRejectionReason,
}) {
  const closeModalHandler = () => {
    setIsModalOpen(false);
    setIsReasonModalOpen && setIsReasonModalOpen(false);
    setIsDeleteModalOpen && setIsDeleteModalOpen(false);
    setSuspensionLoading && setSuspensionLoading(false);
    setIsBioRejectionModalOpen && setIsBioRejectionModalOpen(false);
    setRejectionReason(null);
  };

  return (
    <>
      <Modal
        destroyOnClose
        open={isModalOpen}
        closeIcon={<CloseCircleOutlined className="text-xl text-black" />}
        title={<h3 className="text-2xl font-bold">{title}</h3>}
        footer={null}
        onCancel={handleCancel ? handleCancel : closeModalHandler}
        bodyStyle={bodyStyle}
        width={width}
      >
        {children}
      </Modal>
    </>
  );
}

export default FormModal;
