import React from 'react';
import { Button, Form } from 'antd';

function FormSubmitButton({
  label,
  type = 'primary',
  className = '',
  loading,
  onClick,
  disabled,
}) {
  return (
    <>
      <Form.Item>
        <Button
          type={type}
          htmlType="submit"
          className={className}
          loading={loading}
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </Button>
      </Form.Item>
    </>
  );
}

export default FormSubmitButton;
