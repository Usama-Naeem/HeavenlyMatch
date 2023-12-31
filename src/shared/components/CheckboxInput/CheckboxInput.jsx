import React from 'react';
import { Form, Checkbox } from 'antd';
import './checkbox.css';

function CheckboxInput({
  label,
  name,
  rules = [
    {
      required: false,
    },
  ],
  onChange = null,
  options,
  className,
}) {
  return (
    <>
      <Form.Item label={label} name={name} rules={rules}>
        <div id="checkBox">
          <Checkbox.Group
            options={options}
            onChange={onChange ? onChange : null}
            className={className}
          />
        </div>
      </Form.Item>
    </>
  );
}

export default CheckboxInput;
