import React from 'react';
import { Select, Form } from 'antd';

function FormSelect({
  name,
  label,
  rules = [
    {
      required: false,
    },
  ],
  mode = '',
  placeholder,
  options,
  className = '',
  onChange = null,
  style,
  defaultValue,
  disabled,
}) {
  return (
    <>
      <Form.Item name={name} label={label} rules={rules}>
        <Select
          mode={mode}
          placeholder={placeholder}
          size="large"
          options={options}
          className={className}
          showSearch
          allowClear
          onChange={onChange}
          style={style}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </Form.Item>
    </>
  );
}

export default FormSelect;
