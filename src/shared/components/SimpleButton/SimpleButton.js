import React from "react";
import { Button, Spin } from 'antd';

function SimpleButton({
  type = '',
  className = '',
  label = '',
  onClick,
  loading,
  disabled,
}) {
  return (
    <>
      <Button
        type={type}
        htmlType="submit"
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <Spin /> : label}
      </Button>
    </>
  );
}

export default SimpleButton;
