import { DatePicker, Form } from 'antd';
import React from 'react';

const FormDatePicker = ({
  name,
  label,
  className,
  disabled = false,
  defaultValue,
  format,
  rules = [
    {
      required: false,
    },
  ],
  type = 'text',
  disabledDate,
}) => (
  <>
    <Form.Item name={name} type={type} rules={rules} label={label}>
      <DatePicker
        name={name}
        className={className}
        disabled={disabled}
        defaultValue={defaultValue}
        format={format}
        disabledDate={disabledDate}
      />
    </Form.Item>
  </>
);

export default FormDatePicker;
