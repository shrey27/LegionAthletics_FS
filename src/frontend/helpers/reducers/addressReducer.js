export const addressState = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  stateLoc: '',
  pincode: '',
  errorFields: []
};

export const addressReducerFunction = (state, action) => {
  switch (action.type) {
    case 'SET_FIRSTNAME':
      return {
        ...state,
        firstname: action.payload
      };
    case 'SET_LASTNAME':
      return {
        ...state,
        lastname: action.payload
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'SET_PHONE':
      return {
        ...state,
        phone: action.payload
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.payload
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload
      };
    case 'SET_STATE':
      return {
        ...state,
        stateLoc: action.payload
      };
    case 'SET_PINCODE':
      return {
        ...state,
        pincode: action.payload
      };
    case 'CLEAR_FORM':
      return {
        ...addressState
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errorFields: []
      };
    case 'ERROR_FIELDS':
      return {
        ...state,
        errorFields: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
