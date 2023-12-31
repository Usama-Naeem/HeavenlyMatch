import { InputType } from '../../../enum';

export const paymentConfig = (activeTab) => {
  const columns = [
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
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
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
      title: 'Payment',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      width: '20%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
    },
    {
      title: 'Date of Payment',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      width: '20%',
      inputType: InputType.STRING,
      align: 'center',
      className: 'table-team',
    },
  ];
  // remove columns according to activetabs
  if (activeTab === '2') {
    return columns.filter(
      (col) => col.key !== 'paymentDate' && col.key !== 'paymentAmount'
    );
  } else if (activeTab === '3') {
    return columns.filter((col) => col.key !== 'paymentDate');
  }

  return columns;
};
