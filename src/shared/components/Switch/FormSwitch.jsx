import React from 'react';
import { Form, Switch } from 'antd';

function FormSwitch({
  name,
  label,
  rules = [
    {
      required: false,
    },
  ],
  className = '',
  onChange = null,
  defaultChecked,
  disabled,
}) {
  return (
    <>
      <Form.Item name={name} label={label} rules={rules}>
        <Switch
          className={className}
          onChange={onChange}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
      </Form.Item>
    </>
  );
}

export default FormSwitch;
