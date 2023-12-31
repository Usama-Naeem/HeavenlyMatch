import { InputType } from '../../enum';
import TableButtonActionWithView from '../../shared/components/TableActionButtons/TableButtonActionWithView';

export const teamConfig = (onView, reasonView) => {
  return [
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: '10%',
      key: 'action',
      id: 'view_btn',
      className: 'table-team',
      onCell: () => ({
        style: { color: '#CC5869' },
      }),
      render(_, record) {
        return (
          <TableButtonActionWithView
            onView={onView}
            record={record}
            className="flex items-center justify-evenly"
            label="View"
          />
        );
      },
    },
    {
      title: 'First Name',
      dataIndex: 'reportedUserFirstName',
      key: 'reportedUserFirstName',
      width: '10%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      render: (_, record) => {
        return <div>{record.reportedUser.firstName}</div>;
      },
    },
    {
      title: 'Last Name',
      dataIndex: 'reportedUserLastName',
      key: 'reportedUserLastName',
      width: '10%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      render: (_, record) => {
        return <div>{record.reportedUser.lastName}</div>;
      },
    },
    {
      title: 'Display Name',
      dataIndex: 'reportedUserDisplayName',
      key: 'reportedUserDisplayName',
      width: '10%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      render: (_, record) => {
        return <div>{record.reportedUser?.displayName}</div>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'reportedUserEmail',
      key: 'reportedUserEmail',
      width: '20%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      onCell: () => ({
        style: { color: '#CC5869' },
      }),
      render: (_, record) => {
        return <div>{record.reportedUser.email}</div>;
      },
    },
    {
      title: 'Reported By',
      dataIndex: 'reportedByUserName',
      key: 'reportedByUserName',
      width: '20%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      render: (_, record) => {
        return <div>{record.reportedByUser?.displayName}</div>;
      },
    },
    {
      title: 'Reason for Report',
      dataIndex: 'reportedReason',
      key: 'reportedReason',
      width: '10%',
      align: 'center',
      className: 'table-team',
      onCell: () => ({
        style: { color: '#CC5869' },
      }),
      render(_, record) {
        return (
          <TableButtonActionWithView
            onView={reasonView}
            record={record}
            className="flex items-center justify-evenly"
            label="View"
          />
        );
      },
    },
    {
      title: 'Reported On',
      dataIndex: 'reportedDate',
      key: 'reportedDate',
      align: 'center',
      width: '20%',
      className: 'table-team',
    },
  ];
};
