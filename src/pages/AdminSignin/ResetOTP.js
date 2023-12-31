import { forwardRef, useImperativeHandle } from "react";

let enteredOTP = [];
let finalOTPValue = [];

const ResetOTP = (props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      clearOTP () {
      var container = document.getElementById('otpInput');
      var inputs = container.getElementsByTagName('input');
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value=""
      }
    }}
  })
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
    props.setOtp(finalOTPValue)
  };

  return (
    <section className="w-[300px] lg:w-[450px] flex flex-col justify-center items-center">
        <div className="mb-6">
          <p className="text-white text-left">Please confirm your account by entering the authentication code sent to you on email.</p>
        </div>
      <div id="otpInput" className="flex justify-between w-72 ">
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
    </section>
  );
};

export default forwardRef(ResetOTP);
