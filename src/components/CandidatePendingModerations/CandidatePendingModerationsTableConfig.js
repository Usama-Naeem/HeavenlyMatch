import { InputType, candidateModerationTypes } from '../../enum';
import TableButtonActionWithView from '../../shared/components/TableActionButtons/TableButtonActionWithView';

export const teamConfig = (onView) => {
  return [
    {
      title: 'Action',
      dataIndex: 'view',
      align: 'left',
      width: '10%',
      key: 'view',
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
            className="flex items-center"
            label="Moderate"
          />
        );
      },
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
      width: '15%',
      inputType: InputType.STRING,
      align: 'left',
      className: 'table-team',
    },
    {
      title: 'Moderation Type',
      dataIndex: 'moderationType',
      key: 'moderationType',
      width: '15%',
      inputType: InputType.STRING,
      align: 'left',
      className: 'table-team',
      render: (_, record) =>
        record.moderationType === candidateModerationTypes.NEWPROFILE ? (
          <span>{'New Profile'}</span>
        ) : record.imageModerationType ===
          candidateModerationTypes.PICCHANGE ? (
          <span>{'Picture Change'}</span>
        ) : record.bioModerationType === candidateModerationTypes.BIOUPDATE ? (
          <span>{'Bio Update'}</span>
        ) : (
          ''
        ),
    },
  ];
};
