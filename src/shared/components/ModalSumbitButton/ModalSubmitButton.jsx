import React from 'react';
import { Button, Form } from 'antd';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

function ModalSubmitButton({ label, loading, className, onClick }) {
  return (
    <>
      <Form.Item>
        <Button htmlType="submit" className={className} onClick={onClick}>
          {loading ? <ButtonSpinner /> : label}
        </Button>
      </Form.Item>
    </>
  );
}
export default ModalSubmitButton;
