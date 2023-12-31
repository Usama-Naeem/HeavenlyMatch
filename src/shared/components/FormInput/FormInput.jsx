import { Form, Input } from 'antd';
import React from 'react';
import { PASSWORD } from '../../constant/formConstatnt';

const FormInput = ({
  name,
  type = 'text',
  rules = [
    {
      required: false,
    },
  ],
  placeholder,
  className,
  disabled = false,
  icon,
  label,
  onChange,
  maxLength,
  id = '',
}) => (
  <>
    <Form.Item name={name} type={type} rules={rules} label={label}>
      {type !== PASSWORD ? (
        <Input
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          onChange={onChange ? onChange : null}
          addonAfter={icon}
          id={id}
          maxLength={maxLength}
        />
      ) : (
        <Input.Password
          onChange={onChange ? onChange : null}
          placeholder={placeholder}
          className={className}
          id={id}
        />
      )}
    </Form.Item>
  </>
);

export default FormInput;
