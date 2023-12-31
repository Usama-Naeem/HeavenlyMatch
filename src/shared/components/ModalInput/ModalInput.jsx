import React from "react";
import { Input, Form } from "antd";

function ModalInput({
  label,
  name,
  type = 'text',
  rules = [
    {
      required: false,
    },
  ],
  placeholder,
  icon,
  disabled,
  onChange = null,
  className = 'rounded-2xl',
  maxLength,
}) {
  return (
    <>
      <Form.Item label={label} name={name} rules={rules}>
        <Input
          type={type}
          addonAfter={icon}
          onChange={onChange ? onChange : null}
          size="large"
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          maxLength={maxLength}
        />
      </Form.Item>
    </>
  );
}

export default ModalInput;
