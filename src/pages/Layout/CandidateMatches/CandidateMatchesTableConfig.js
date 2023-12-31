import { InputType, candidateStatusOptions } from '../../../enum';
import { getLabelForKey } from '../../../shared/api/candidates';
import TableButtonActionWithView from '../../../shared/components/TableActionButtons/TableButtonActionWithView';

export const teamConfig = (onView) => {
  return [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '10%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '10%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      align: 'center',
      width: '10%',
      key: 'displayName',
      id: 'view_btn',
      className: 'table-team',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
      onCell: () => ({
        style: { color: '#CC5869' },
      }),
      render(text) {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Date of Match',
      dataIndex: 'matchDate',
      key: 'matchDate',
      width: '20%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      align: 'center',
      className: 'table-team',
      render: (text) => getLabelForKey(candidateStatusOptions, text),
    },
    {
      title: 'Payment Exclusion',
      dataIndex: 'paymentExclusion',
      key: 'paymentExclusion',
      align: 'center',
      width: '20%',
      className: 'table-team',
      render: (text) =>
        text ? (
          <span className="text-white text-sm bg-gray py-1 px-2 rounded-md">
            {'Excluded from payment'}
          </span>
        ) : (
          <span className="text-white text-sm bg-lightburgundy py-1 px-2 rounded-md">
            {'Paid Candidate'}
          </span>
        ),
    },
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
  ];
};
