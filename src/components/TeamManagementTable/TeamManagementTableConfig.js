import {
  adminRoleOptions,
  candidateStatusOptions,
  InputType,
  userStatusOptions,
} from '../../enum';
import { getLabelForKey, validateName } from '../../shared/api/candidates';
import TeamManagementTableActionButtons from '../TeamManagementTableActionButtons/TeamManagementTableActionButtons';

export const teamConfig = (editingKey, onSave, onCancel, onEdit, onDelete) => {
  return [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '10%',
      editable: true,
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      inputProps: {
        rules: [
          () => ({
            async validator(_, value) {
              await validateName(value);
            },
          }),
        ],
      },
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '10%',
      editable: true,
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      inputProps: {
        rules: [
          () => ({
            async validator(_, value) {
              await validateName(value);
            },
          }),
        ],
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      editable: false,
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      onCell: (record) => ({
        style: { color: '#CC5869' },
      }),
      render(text) {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '10%',
      editable: true,
      inputType: InputType.SELECT,
      inputProps: {
        options: adminRoleOptions,
      },
      align: 'center',
      className: 'table-team',
      render: (text) => getLabelForKey(adminRoleOptions, text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'role',
      width: '10%',
      editable: true,
      inputType: InputType.SELECT,
      inputProps: {
        options: userStatusOptions,
      },
      align: 'center',
      className: 'table-team',
      render: (text) => getLabelForKey(candidateStatusOptions, text),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: '10%',
      key: 'action',
      id: 'edit_btn',
      className: 'table-team',
      render: (_, record) => {
        return (
          <TeamManagementTableActionButtons
            onSave={onSave}
            record={record}
            onCancel={onCancel}
            editingKey={editingKey}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      },
    },
  ];
};
