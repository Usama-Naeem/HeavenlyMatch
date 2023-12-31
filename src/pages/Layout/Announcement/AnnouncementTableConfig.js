import { InputType } from '../../../enum';
import { cleanedData } from '../../../shared/api/candidates';
import TableButtonActionWithView from '../../../shared/components/TableActionButtons/TableButtonActionWithView';

export const announcementConfig = (onView) => {
  return [
    {
      title: 'Announcement Type',
      dataIndex: 'announcementsType',
      key: 'announcementsType',
      width: '15%',
      inputType: InputType.STRING,
      align: 'left',
      className: 'table-team',
      render: (text) => cleanedData(text),
    },
    {
      title: 'Announcement For',
      dataIndex: 'announcementsFor',
      key: 'announcementsFor',
      width: '20%',
      inputType: InputType.STRING,
      align: 'left',
      className: 'table-team',
      render: (text) => cleanedData(text),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'left',
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
            className="flex"
            label="View"
          />
        );
      },
    },
  ];
};
