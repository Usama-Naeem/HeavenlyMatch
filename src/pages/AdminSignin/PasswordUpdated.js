import React, { Fragment, useState } from 'react';
import { Form } from 'antd';
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SIGNIN_NEW } from '../../constant/pageRoutes';

const PasswordUpdated = (props) => {
 const navigate = useNavigate();

  const changeState = () => {
    window.localStorage.clear(); 
    window.location.reload(true);
};


  return (
    <Fragment>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        className="flex flex-col items-start justify-start"
      >
        <FormSubmitButton
          type="primary"
          className="w-[300px] lg:w-[450px] h-[40px] submit-button"
          label={'Login'}
          onClick={() => changeState()}
        />
      </Form>
    </Fragment>
  );
};

export default PasswordUpdated;
