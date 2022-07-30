export const defaultCartState = {
  cartLoading: false,
  cartError: '',
  cartListData: [],
  addedCartPID: [],
  ordercart: {},
  orders: []
};
export const cartApiReducerFunc = (state, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        cartLoading: true,
        cartError: ''
      };
    case 'API_RESPONSE':
      return {
        ...state,
        cartLoading: false,
        cartError: '',
        cartListData: action.payload
      };
    case 'API_FAILURE':
      return {
        ...state,
        cartLoading: false,
        cartError: 'TECHNICAL ISSUE. PLEASE TRY AGAIN AFTER SOME TIME'
      };
    case 'UPDATE_CART_PID':
      return {
        ...state,
        addedCartPID: action.payload
      };
    case 'CHECKOUT_DETAILS':
      return {
        ...state,
        ordercart: action.payload
      };
    case 'UPDATE_ORDERS':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case 'STOP_LOADER':
      return {
        ...state,
        cartLoading: false
      };
    default:
      return { ...defaultCartState };
  }
};
