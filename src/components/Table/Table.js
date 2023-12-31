import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';

const Tables = ({ data, columns }) => {
  const [Ndata, setNData] = useState([]);
  const [Ncolumns, setNColumns] = useState([]);

  useEffect(() => {
    setNColumns(columns);
    setNData(data);
  }, [data, columns]);
  return (
    <Table
      columns={Ncolumns}
      dataSource={Ndata}
      className="overflow-x-scroll"
    />
  );
};
export default Tables;
