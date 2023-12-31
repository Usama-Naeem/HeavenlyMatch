import {
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Fragment, useState } from 'react';
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';
import { passwordValidation } from '../../utilities';
import {
  INVALID_CONFIRMATION_CODE,
  PASSWORD_NOT_MATCHED,
  PASSWORD_POLICY_ERROR,
} from '../../shared/constant/error';
import { Auth } from 'aws-amplify';
import PasswordUpdated from './PasswordUpdated';
import { getUserByEmail, updateUser } from '../../shared/api/candidates';
import { listHeavenlymatchAdmins } from '../../graphql/queries';
import { updateHeavenlymatchAdmin } from '../../graphql/mutations';
import logo from '../../assets/logo.png';

const NewPassword = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setCofirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [display, setDisplay] = useState('new');

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setErrorMessage(null);
  };

  const onChangeConfirmPassword = (event) => {
    setCofirmPassword(event.target.value);
    setErrorMessage(null);
  };

  const setNewPassword = () => {
    let passwordValidated = passwordValidation(password);
    if (!passwordValidated) {
      setErrorMessage(PASSWORD_POLICY_ERROR);
    } else if (password !== confirmPassword) {
      setErrorMessage(PASSWORD_NOT_MATCHED);
    } else {
      props.setLoader(true);
      Auth.completeNewPassword(
        props.user, // the Cognito User Object
        password // the new password
      )
        .then(async (user) => {
          //update user status in dynamo
          const email = user.signInUserSession?.idToken?.payload['email'];
          const getCurrentUser = await getUserByEmail(
            email,
            listHeavenlymatchAdmins
          );
          const userId =
            getCurrentUser.data.listHeavenlymatchAdmins.items[0].id;
          const editUser = {
            id: userId,
            status: 'active',
          };
          await updateUser(editUser, updateHeavenlymatchAdmin);
          props.setLoader(false);
          setDisplay('updated');
        })
        .catch((err) => {
          props.setLoader(false);
          message.error(err.message);
        });
    }
  };
  const backButtonClick = () => {
    props.setshowNewPasswordScreen(false);
  };

  return (
    <Fragment>
      <div>
        {display !== 'updated' && (
          <Button
            type="link"
            onClick={backButtonClick}
            className="forgot-password-link mb-10"
            icon={<LeftOutlined className="align-middle" />}
          >
            Back
          </Button>
        )}{' '}
        <div className={'flex items-center justify-center mb-10'}>
          <img src={logo} alt="logo" />
        </div>
        {display === 'new' ? (
          <div className="flex flex-col w-[300px] lg:w-[450px] h-[40px] text-sm text-white mb-12">
            <h1
              className="font-sans md:text-2xl text-lightColor mb-4"
              style={{ color: 'white' }}
            >
              Set New Password
            </h1>
            <h1>In order to protect your password, make sure your password</h1>
            <ul className="flex flex-col">
              <li>
                <span className="text-2xl align-middle">•</span> Is longer that
                7 charactors
              </li>
              <li>
                <span className="text-2xl align-middle">•</span> Should contain
                numeric and alphabetic both
              </li>
            </ul>
          </div>
        ) : (
          display === 'updated' && (
            <div className="flex flex-col items-center justify-center w-[300px] lg:w-[450px] text-sm text-white ">
              <h1
                className="font-sans md:text-2xl text-lightColor mb-4"
                style={{ color: 'white' }}
              >
                Password Updated
              </h1>
              <h1>You have successfully updated your password.</h1>
            </div>
          )
        )}
      </div>
      {display === 'new' && (
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
            type={!visible ? 'Password' : 'Text'}
            className="rounded-3xl h-10 mb-6"
            placeholder="Enter Password"
            suffix={
              visible ? (
                <EyeOutlined onClick={() => setVisible(!visible)} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisible(!visible)} />
              )
            }
            prefix={<LockOutlined style={{ color: '#CC5869' }} />}
            onChange={onChangePassword}
          />
          <Input
            id="password"
            type={!confirmVisible ? 'Password' : 'Text'}
            className="rounded-3xl h-10 mb-6"
            placeholder="Confirm Password"
            suffix={
              visible ? (
                <EyeOutlined
                  onClick={() => setConfirmVisible(!confirmVisible)}
                />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setConfirmVisible(!confirmVisible)}
                />
              )
            }
            prefix={<LockOutlined style={{ color: '#CC5869' }} />}
            onChange={onChangeConfirmPassword}
          />
          <FormSubmitButton
            type="primary"
            className="w-[300px] lg:w-[450px] h-[40px] submit-button"
            label={'Save Password'}
            onClick={setNewPassword}
          />
        </Form>
      )}
      {display === 'updated' && <PasswordUpdated />}
    </Fragment>
  );
};

export default NewPassword;
