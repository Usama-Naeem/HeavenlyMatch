import { Popconfirm } from 'antd';
import GenericButton from '../GenericButton/GenericButton';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './TeamManagementTableActionButtons.css';

const TeamManagementTableActionButtons = ({
  onSave,
  record,
  onCancel,
  editingKey,
  onEdit,
}) => {
  const editable = record.key === editingKey;
  return editable ? (
    <div id="actionButtons" className="flex items-center justify-evenly">
      <Popconfirm
        title="Are you sure?"
        okButtonProps={{ type: 'default', className: 'hover:bg-lightburgundy' }}
        cancelButtonProps={{
          type: 'default',
          className: 'hover:bg-lightburgundy',
        }}
        onConfirm={() => onSave(record.key)}
      >
        <GenericButton
          className="w-1 text-white bg-lightburgundy"
          icon={<CheckOutlined />}
        />
      </Popconfirm>
      <GenericButton
        className="w-1 text-white bg-lightburgundy"
        icon={<CloseOutlined />}
        onClick={onCancel}
      />
    </div>
  ) : (
    <div className="flex items-center justify-evenly">
      {/* Edit Button */}
      <p
        className="text-lightburgundy cursor-pointer"
        disabled={editingKey !== ''}
        onClick={() => onEdit(record)}
      >
        Edit
      </p>
    </div>
  );
};

export default TeamManagementTableActionButtons;
