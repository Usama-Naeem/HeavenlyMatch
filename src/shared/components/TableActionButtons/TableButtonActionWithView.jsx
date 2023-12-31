import React from 'react';
import { Typography } from 'antd';

function TableButtonActionWithView({ record, onView, className,label }) {
  return (
    <div className={className}>
      <Typography.Link
        onClick={() => onView(record)}
        className="flex items-center justify-center !text-lightburgundy"
      >
        {label}
      </Typography.Link>
    </div>
  );
}

export default TableButtonActionWithView;
