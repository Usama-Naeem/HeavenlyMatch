import { useNavigate } from 'react-router-dom';
import FormSubmitButton from '../../components/FormSubmitButton/FormSubmitButton';
import { useContext, useState } from 'react';
import AuthContext from '../../shared/context/AuthContext';
import { Auth } from 'aws-amplify';
import { CANDIDATE_MANAGEMENT } from '../../shared/routes';
import { message } from 'antd';
import logo from '../../assets/logo.png';

let enteredOTP = [];
let finalOTPValue = [];

const OTP = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (e) => {
    var container = document.getElementById('otpInput');
    var inputs = container.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', function (e) {
        if (e.keyCode === 8 && this.value === '') {
          if (i !== 0) {
            inputs[i - 1].focus();
          }
        } else if (e.keyCode != 8 && this.value != '') {
          if (i !== 5) {
            inputs[i + 1].focus();
          }
        }
      });
    }

    enteredOTP = enteredOTP.filter((otp) => otp.name != e.target.name);
    enteredOTP.push({ name: e.target.name, value: e.target.value });
    enteredOTP.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    finalOTPValue = enteredOTP.map((otp) => {
      return otp.value;
    });
  };

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const onEnteredOTP = async (otp) => {
    setIsDisabled(true);
    props.setLoader(true);
    let otpValue = otp.join('');
    Auth.sendCustomChallengeAnswer(props.user, otpValue)
      .then(async (response) => {
        props.setLoader(false);
        let userSession = await Auth.currentSession();
        let userGroups = userSession.idToken.payload['cognito:groups'];
        localStorage.setItem('userGroup', JSON.stringify(userGroups));
        authContext.setUserGroupHandler(userGroups);
        authContext.setUserDataHandler(props.user);
        navigate(CANDIDATE_MANAGEMENT);
      })
      .catch((err) => {
        var container = document.getElementById('otpInput');
        var inputs = container.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value=""
        }
        setIsDisabled(false);
        props.setLoader(false);
        message.error('Invalid OTP, A new code has been sent to your number', [
          4,
        ]);
      });
  };
  return (
    <section className="w-[300px] lg:w-[450px] flex flex-col justify-center items-center">
      <div className={'flex items-center justify-center mb-10'}>
        <img src={logo} alt="logo" />
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        <h1 className="text-white font-semibold mb-3">
          Authenticate your Account
        </h1>
        <p className="text-white text-center">
          Please confirm your account by entering the authentication code sent
          to you on phone number.
        </p>
      </div>
      <div id="otpInput" className="flex justify-between w-72 mb-10 ">
        <input
          type="text"
          className="w-12 h-12 p-5 rounded-lg"
          placeholder="0"
          maxlength="1"
          onChange={handleChange}
          name="number-1"
        />{' '}
        <span className="self-center">-</span>
        <input
          type="text"
          className="w-12 h-12 p-5 rounded-lg"
          placeholder="0"
          maxlength="1"
          onChange={handleChange}
          name="number-2"
        />{' '}
        <span className="self-center">-</span>
        <input
          type="text"
          className="w-12 h-12 p-5 rounded-lg"
          placeholder="0"
          maxlength="1"
          onChange={handleChange}
          name="number-3"
        />{' '}
        <span className="self-center">-</span>
        <input
          type="text"
          className="w-12 h-12 p-5 rounded-lg"
          placeholder="0"
          maxlength="1"
          onChange={handleChange}
          name="number-4"
        />{' '}
        <span className="self-center">-</span>
        <input
          type="text"
          className="w-12 h-12 p-5 rounded-lg"
          placeholder="0"
          maxlength="1"
          onChange={handleChange}
          name="number-5"
        />{' '}
        <span className="self-center">-</span>
        <input
          type="text"
          className="w-12 h-12 p-5 rounded-lg"
          placeholder="0"
          maxlength="1"
          onChange={handleChange}
          name="number-6"
        />{' '}
      </div>
      <div>
        <FormSubmitButton
          type="primary"
          className="w-[300px] lg:w-[450px] h-[40px] submit-button"
          label="Verify OTP"
          onClick={() => onEnteredOTP(finalOTPValue)}
          disabled={isDisabled}
        />
      </div>
    </section>
  );
};

export default OTP;
