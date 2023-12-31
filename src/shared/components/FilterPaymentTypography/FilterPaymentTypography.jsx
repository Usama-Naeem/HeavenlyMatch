import React from 'react';
import { Typography } from 'antd';

function FilterPaymentTypography({ onClick, label }) {
  return (
    <div>
      <Typography.Link
        onClick={onClick}
        className="flex items-center !text-black mb-2 hover:bg-slate-100 rounded-md "
      >
        {label}
      </Typography.Link>
    </div>
  );
}

export default FilterPaymentTypography;
