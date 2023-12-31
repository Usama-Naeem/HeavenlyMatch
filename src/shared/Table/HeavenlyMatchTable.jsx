import React from 'react';
import { Table } from 'antd';
import { EditableCell } from '../../utilities/antd';

const HeavenlyMatchTable = ({
  columns,
  dataSource,
  rowSelection = '',
  rowKey,
  rowClassName,
  loading,
}) => (
  <>
    <Table
      className="w-full shadow-sm"
      pagination={{ pageSize: 8, showSizeChanger: false }}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: 'max-content',
      }}
      columns={columns}
      dataSource={!loading && dataSource}
      rowSelection={rowSelection}
      rowKey={rowKey}
      loading={loading}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      rowClassName={rowClassName}
    />
  </>
);

export default HeavenlyMatchTable;
