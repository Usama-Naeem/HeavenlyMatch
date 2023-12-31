export const FormRule = {
  EMAIL: [
    {
      required: true,
      message: 'Please enter email!',
    },
    {
      pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\b\.[a-zA-Z]{2,}$/,
      message: 'Enter a valid email address!',
    },
  ],

  FIRSTNAME: [
    {
      required: true,
      message: 'Please enter your first name!',
    },
    {
      pattern: /^[a-zA-Z]+$/,
      message: 'First name should only be alphabets!',
    },
  ],

  LASTNAME: [
    {
      required: true,
      message: 'Please enter your last name!',
    },
    {
      pattern: /^[a-zA-Z]+$/,
      message: 'Last name should only be alphabets!',
    },
  ],

  MIDDLENAME: [
    {
      required: false,
      message: 'Please enter your middle name!',
    },
    {
      pattern: /^[a-zA-Z]+$/,
      message: 'Middle name should only be alphabets!',
    },
  ],

  DISPLAYNAME: [
    {
      required: false,
      message: 'Please enter your display name!',
    },
  ],

  SELECT: [
    {
      required: true,
      message: 'Please select some value!',
    },
  ],

  PHONENUMBER: [
    {
      required: true,
      message: 'Please enter your phone number!',
    },
    {
      pattern: /^\+1\d{10}$/,
      message: 'Phone number should be in format +1xxxxxxxxxx',
    },
    {
      min: 10,
      message: 'The phone number must have 10 digits!',
    },
  ],

  SIBLINGS: [
    {
      required: true,
      message: 'Required Field',
    },
    {
      pattern: new RegExp('^[1-9][0-9]?$'),
      message: 'Invalid input.',
    },
  ],

  IMAGEQUANTITY: [
    {
      pattern: new RegExp('^[5-9]|[1-9]d+$'),
      message: 'Enter number greater than 4.',
    },
  ],

  // ^[5-9]|[1-9]\d+$

  EDUCATION: [
    {
      pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
      message: 'Should only contain alphabetical characters and numbers.',
    },
    {
      required: true,
      message: 'Required field',
    },
  ],

  NEWINTERESTS: [
    {
      pattern: new RegExp('[a-zA-Z ]+'),
      message: 'Invalid Input.',
    },
  ],

  WORK: [
    {
      required: true,
      message: 'This is a required field.',
    },
    {
      pattern: /^[a-zA-Z]{0,25}$/,
      message: 'Name should be less than 25 alphabets.',
    },
  ],

  ETHNICITY: [
    {
      required: false,
      message: 'Please select ethnicity!',
    },
  ],

  COUNTRY: [
    {
      required: false,
      message: 'Please select your country!',
    },
  ],

  STATE: [
    {
      required: false,
      message: 'Please select your state!',
    },
  ],

  VISASTATUS: [
    {
      required: true,
      message: 'Please select visa status!',
    },
  ],

  INCH: [
    {
      required: false,
      message: 'Please select inches!',
    },
  ],

  FEET: [
    {
      required: false,
      message: 'Please select feets!',
    },
  ],

  BIRTHDAY: [
    {
      required: false,
      message: 'Please enter date of birth!',
    },
  ],

  GENDER: [
    {
      required: true,
      message: 'Please select user gender!',
    },
  ],
};
