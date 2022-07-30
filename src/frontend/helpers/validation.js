import { errorStatements } from '../utility/constants';
export function validateSignIn(state, dispatch) {
  const { email, password } = state;
  const errorArray = [];
  if (
    !email ||
    !email.match(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    )
  ) {
    errorArray.push('EMAIL-INCORRECT');
  }
  if (!password || password.length < 8) {
    errorArray.push('PASSWORD-INCORRECT');
  }
  if (errorArray.length) {
    errorArray.forEach((elem) =>
      dispatch({ type: elem, payload: errorStatements[elem] })
    );
    return false;
  }
  return true;
}

export function validationSignUp(state, dispatch) {
  const {
    firstName,
    lastName,
    signUpEmail,
    signUpPassword,
    cnfPassword,
    phone,
    signUpAddress
  } = state;
  const errorArray = [];
  if (!firstName || !firstName.match(/^[a-zA-Z ]+/)) {
    errorArray.push('SIGNUP-FIRSTNAME-ERROR');
  }
  if (!lastName || !lastName.match(/^[a-zA-Z ]+/)) {
    errorArray.push('SIGNUP-LASTNAME-ERROR');
  }
  if (
    !signUpEmail ||
    !signUpEmail.match(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    )
  ) {
    errorArray.push('SIGNUP-EMAIL-INCORRECT');
  }
  if (!signUpPassword || signUpPassword.length < 8) {
    errorArray.push('SIGNUP-PASSWORD-INCORRECT');
  }
  if (!cnfPassword || cnfPassword.length < 8) {
    errorArray.push('CONFIRM-PASSWORD-INCORRECT');
  }
  if (cnfPassword !== signUpPassword) {
    errorArray.push('PASSWORDS-MISMATCH');
  }
  if (!phone || !phone.match(/^\d{10}$/)) {
    errorArray.push('SIGNUP-PHONE-ERROR');
  }
  if (!signUpAddress) {
    errorArray.push('SIGNUP-ADDRESS-ERROR');
  }
  if (errorArray.length) {
    errorArray.forEach((elem) =>
      dispatch({ type: elem, payload: errorStatements[elem] })
    );
    return false;
  }
  return true;
}

export const validateUpdateDetails = (state, dispatch) => {
  const { firstName, lastName, phone, signUpAddress } = state;
  const errorArray = [];
  if (!firstName || !firstName.match(/^[a-zA-Z ]+/)) {
    errorArray.push('SIGNUP-FIRSTNAME-ERROR');
  }
  if (!lastName || !lastName.match(/^[a-zA-Z ]+/)) {
    errorArray.push('SIGNUP-LASTNAME-ERROR');
  }
  if (!phone || !phone.match(/^\d{10}$/)) {
    errorArray.push('SIGNUP-PHONE-ERROR');
  }
  if (!signUpAddress) {
    errorArray.push('SIGNUP-ADDRESS-ERROR');
  }
  if (errorArray.length) {
    errorArray.forEach((elem) =>
      dispatch({ type: elem, payload: errorStatements[elem] })
    );
    return false;
  }
  return true;
};
