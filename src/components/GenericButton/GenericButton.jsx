import { Button, Spin } from 'antd';
import React from 'react';

const GenericButton = ({
  label = null,
  icon,
  size,
  shape,
  className,
  onClick,
  buttonWidth,
  isLoading,
  disabled,
}) => {
  return (
    <Button
      className={`${className ? className : 'bg-dullGrey'}`}
      type="primary"
      shape={shape}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={`flex items-center justify-around ${
          buttonWidth ? buttonWidth : 'w-auto'
        }`}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {icon}
            <p>{label}</p>
          </>
        )}
      </div>
    </Button>
  );
};

export default GenericButton;
