import { InputType } from '../../../enum';

export const candidatePaymentConfig = () => {
  return [
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
      width: '17%',
      inputType: InputType.STRING,
      align: 'left',
      className: 'table-team',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '25%',
      inputType: InputType.STRING,
      align: 'left',
      className: 'table-team',
    },
    {
      title: 'Ammount',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      width: '12%',
      inputType: InputType.STRING,
      align: 'left',
      className: 'table-team',
    },
  ];
};
