import React from 'react';
import { Select, Form } from 'antd';

function HeaderFormSelect({
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
          onChange={onChange}
          style={style}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </Form.Item>
    </>
  );
}

export default HeaderFormSelect;
