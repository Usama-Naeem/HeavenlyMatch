import { useState } from 'react';
import { Button } from 'antd';
import './CandidateEditSaveButtons.css';
import { EditOutlined } from '@ant-design/icons';

const CandidateEditSaveButtons = (props) => {
  const handleEditClick = () => {
    props.editStatus(true);
  };

  const handleSaveClick = () => {
    props.editStatus(false);
  };

  return (
    <div id="candidateEditSaveButtons">
      {props.isEditing ? (
        <Button
          type="primary"
          shape="round"
          className={`text-white bg-lightburgundy ${
            props?.width ? `w-${props.width}` : 'w-40'
          }`}
          onClick={handleSaveClick}
        >
          {props.appSetting ? 'Save Settings' : 'Save'}
        </Button>
      ) : (
        <Button
          type="primary"
          shape="round"
          className={`text-black rounded ${
            props?.width ? `w-${props.width}` : 'w-40'
          }`}
          onClick={handleEditClick}
          icon={<EditOutlined style={{ verticalAlign: '1px' }} />}
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export default CandidateEditSaveButtons;
