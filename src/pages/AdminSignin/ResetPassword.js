import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { Fragment, useState } from 'react';
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';
import { passwordValidation } from '../../utilities';
import {
  INVALID_CONFIRMATION_CODE,
  PASSWORD_NOT_MATCHED,
  PASSWORD_POLICY_ERROR,
} from '../../shared/constant/error';
import { Auth } from 'aws-amplify';

const ResetPassword = (props) => {
  const [visable, setVisable] = useState(false);
  const [ConfirmVisable, setConfirmVisable] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setCofirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);


  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setErrorMessage(null);
  };

  const onChangeConfirmPassword = (event) => {
    setCofirmPassword(event.target.value);
    setErrorMessage(null);
  };

  const resetPassword = () => {
    props.setLoader(true)
    let passwordValidated = passwordValidation(password);
    if (!passwordValidated) {
      setErrorMessage(PASSWORD_POLICY_ERROR);
    } else if (password !== confirmPassword) {
      setErrorMessage(PASSWORD_NOT_MATCHED);
    } else {
      let username = props.userEmail;
      Auth.forgotPasswordSubmit(username, props.otp.join(''), password)
        .then((data) => {
    props.setLoader(false)
          props.setDisplay('updated');
        })
        .catch((err) => {
          props.clearOTP()
          props.setLoader(false)
          err.message === INVALID_CONFIRMATION_CODE
            ? message.error(INVALID_CONFIRMATION_CODE)
            : message.error(err.message);
        });
    }
  };
  return (
    <Fragment>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          className="flex flex-col items-start justify-start mt-6"
        >
          {errorMessage && (
            <p
              className="error-message text-red-500 mb-4"
              aria-live="assertive"
            >
              {errorMessage}
            </p>
          )}
          <Input
            id="password"
            type={!visable ? 'Password' : 'Text'}
            className="rounded-3xl h-10 mb-6"
            placeholder="Enter Password"
            suffix={
              visable ? (
                <EyeOutlined onClick={() => setVisable(!visable)} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisable(!visable)} />
              )
            }
            prefix={<LockOutlined style={{ color: '#CC5869' }}/>}
            onChange={onChangePassword}
          />
          <Input
            id="password"
            type={!ConfirmVisable ? 'Password' : 'Text'}
            className="rounded-3xl h-10 mb-6"
            placeholder="Confirm Password"
            suffix={
              visable ? (
                <EyeOutlined
                  onClick={() => setConfirmVisable(!ConfirmVisable)}
                />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setConfirmVisable(!ConfirmVisable)}
                />
              )
            }
            prefix={<LockOutlined style={{ color: '#CC5869' }}/>}
            onChange={onChangeConfirmPassword}
          />
          <FormSubmitButton
            type="primary"
            className="w-[300px] lg:w-[450px] h-[40px] submit-button"
            label={'Reset Password'}
            onClick={resetPassword}
          />
        </Form>
    </Fragment>
  );
};

export default ResetPassword;
