export const wishlistDefaultState = {
  wishlistLoading: false,
  wishlistData: [],
  addedPID: []
};
export const wishlistApiReducerFunc = (state, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        wishlistLoading: true
      };
    case 'API_RESPONSE':
      return {
        ...state,
        wishlistLoading: false,
        wishlistData: action.payload
      };
    case 'API_FAILURE':
      return {
        ...state,
        wishlistLoading: false
      };
    case 'UPDATE_WISHLIST_PID':
      return {
        ...state,
        addedPID: action.payload
      };
    case 'STOP_LOADER':
      return {
        ...state,
        wishlistLoading: false
      };
    default:
      return { ...wishlistDefaultState };
  }
};
