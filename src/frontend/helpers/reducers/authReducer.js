// Primary details by default are set to sign up form details
// during address selection they can be temporarily set to the selected address details
// from /profile/address page

export const defaultState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  signUpEmail: '',
  signUpEmailError: '',
  signUpPassword: '',
  signUpPasswordError: '',
  cnfPassword: '',
  cnfpasswordError: '',
  firstName: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  phone: '',
  phoneError: '',
  signUpAddress: '',
  signUpAddressError: '',
  signinError: '',
  signupError: '',
  primaryDetails: {},
  rememberMe: false,
  signinRememberMe: false,
  token: ''
};
export const authReducerFunc = (state, action) => {
  switch (action.type) {
    case 'SIGNIN-EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'EMAIL-INCORRECT':
      return {
        ...state,
        emailError: action.payload
      };
    case 'SIGNIN-PASSWORD':
      return {
        ...state,
        password: action.payload
      };
    case 'PASSWORD-INCORRECT':
      return {
        ...state,
        passwordError: action.payload
      };
    case 'SIGNUP-EMAIL':
      return {
        ...state,
        signUpEmail: action.payload
      };
    case 'SIGNUP-EMAIL-INCORRECT':
      return {
        ...state,
        signUpEmailError: action.payload
      };
    case 'SIGNUP-PASSWORD':
      return {
        ...state,
        signUpPassword: action.payload
      };
    case 'SIGNUP-PASSWORD-INCORRECT':
      return {
        ...state,
        signUpPasswordError: action.payload
      };
    case 'SIGNUP-FIRSTNAME':
      return {
        ...state,
        firstName: action.payload
      };
    case 'SIGNUP-FIRSTNAME-ERROR':
      return {
        ...state,
        firstNameError: action.payload
      };
    case 'SIGNUP-LASTNAME':
      return {
        ...state,
        lastName: action.payload
      };
    case 'SIGNUP-LASTNAME-ERROR':
      return {
        ...state,
        lastNameError: action.payload
      };
    case 'CONFIRM-PASSWORD':
      return {
        ...state,
        cnfPassword: action.payload
      };
    case 'CONFIRM-PASSWORD-INCORRECT':
      return {
        ...state,
        cnfpasswordError: action.payload
      };
    case 'PASSWORDS-MISMATCH':
      return {
        ...state,
        signupError: action.payload
      };
    case 'SIGNUP-PHONE':
      return {
        ...state,
        phone: action.payload
      };
    case 'SIGNUP-PHONE-ERROR':
      return {
        ...state,
        phoneError: action.payload
      };
    case 'SIGNUP-ADDRESS':
      return {
        ...state,
        signUpAddress: action.payload
      };
    case 'SIGNUP-ADDRESS-ERROR':
      return {
        ...state,
        signUpAddressError: action.payload
      };
    case 'TOKEN-SAVED':
      return {
        ...state,
        userdata: 'TOKENSAVED',
        token: action.payload,
        signupError: ''
      };
    case 'TOKEN-REMOVED':
      return {
        ...state,
        userdata: '',
        token: ''
      };
    case 'SIGNIN-ERROR':
      return {
        ...state,
        signinError: action.payload
      };
    case 'SIGNUP-ERROR':
      return {
        ...state,
        signupError: action.payload
      };
    case 'CLEAR-ALL-ERRORS':
      return {
        ...state,
        cnfpasswordError: '',
        passwordError: '',
        emailError: '',
        signUpError: '',
        signinError: '',
        firstNameError: '',
        lastNameError: '',
        signUpEmailError: '',
        signUpPasswordError: '',
        phoneError: '',
        signUpAddressError: ''
      };
    case 'REMEMBER-ME':
      return {
        ...state,
        rememberMe: !state.rememberMe
      };
    case 'SIGNIN-REMEMBER-ME':
      return {
        ...state,
        signinRememberMe: !state.signinRememberMe
      };
    case 'PRIMARY-DETAILS':
      return {
        ...state,
        primaryDetails: action.payload
      };
    case 'SET-DEFAULT':
      return {
        ...defaultState
      };
    default:
      return {
        ...state
      };
  }
};
