import React from 'react';
import { Typography } from 'antd';

function TableActionButtonsWithUsername({ record, onView, className }) {
  return (
    <div className={className}>
      <Typography.Link
        onClick={() => onView(record)}
        className="flex items-center justify-center !text-lightburgundy"
      >
        {record.displayName}
      </Typography.Link>
    </div>
  );
}

export default TableActionButtonsWithUsername;
