import { InputType, candidateStatusOptions } from '../../enum';
import { getLabelForKey } from '../../shared/api/candidates';
import TableActionButtonsWithUsername from '../../shared/components/TableActionButtons/TableActionButtonsWithUsername';

export const teamConfig = (onView) => {
  return [
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
      align: 'center',
      width: '10%',
      id: 'view_btn',
      className: 'table-team',
      onCell: () => ({
        style: { color: '#CC5869' },
      }),
      render(_, record) {
        return (
          <TableActionButtonsWithUsername
            onView={onView}
            record={record}
            className="flex items-center justify-evenly"
          />
        );
      },
    },
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
      render: (_, record) =>
        record.paymentExclusion === true && record.isPaid === false ? (
          <span className="text-white text-sm bg-gray py-1 px-2 rounded-md">
            {'Excluded from payment'}
          </span>
        ) : record.paymentExclusion === false && record.isPaid === true ? (
          <span className="text-white text-sm bg-lightburgundy py-1 px-2 rounded-md">
            {'Paid Candidate'}
          </span>
        ) : record.paymentExclusion === false && record.isPaid === false ? (
          <span className="text-black text-sm py-1 px-2 rounded-md border-black border-2">
            {'Free Candidate'}
          </span>
        ) : (
          ''
        ),
    },
  ];
};
