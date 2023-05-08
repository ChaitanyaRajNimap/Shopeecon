const message = {
  EMPTY_FEILD: 'This feild is required.',
  INVALID_NAME: 'Please enter valid name.',
  INVALID_EMAIL: 'Please enter valid email.',
  INVALID_PASSWORD: 'Please enter valid password.',
  INVALID_PHONE_NO: 'Please enter valid phone number.',
  PASSWORD_NOT_MATCHED: 'Passwords are not maching.',
  NEW_PASSWORD: `Password can't be same as current, Please enter new one.`,
};

const nameRegEx = /^[a-zA-Z\s]+$/;
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,8}$/;
const phoneNoRegEx = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

const validateName = value => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!nameRegEx.test(value)) {
    return message.INVALID_NAME;
  }
  return '';
};

const validateEmail = value => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!emailRegEx.test(value)) {
    return message.INVALID_EMAIL;
  }
  return '';
};

const validatePassword = value => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!passwordRegEx.test(value)) {
    return message.INVALID_PASSWORD;
  }
  return '';
};

const validateConfirmPassword = (value, password) => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!passwordRegEx.test(value)) {
    return message.INVALID_PASSWORD;
  } else if (value !== password) {
    return message.PASSWORD_NOT_MATCHED;
  }
  return '';
};

const validateNewPassword = (value, password) => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!passwordRegEx.test(value)) {
    return message.INVALID_PASSWORD;
  } else if (value == password) {
    return message.NEW_PASSWORD;
  }
  return '';
};

const validatePhoneNo = value => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!phoneNoRegEx.test(value)) {
    return message.INVALID_PASSWORD;
  }
  return '';
};

const validate = {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateNewPassword,
  validatePhoneNo,
};

export default validate;
