export const orderstDefaultState = {
  ordersLoader: false,
  ordersData: [],
  ordersError: "",
};

export const ordersReducer = (state, action) => {
  switch (action.type) {
    case "API_REQUEST":
      return {
        ...state,
        ordersLoader: true,
      };
    case "API_RESPONSE":
      return {
        ...state,
        ordersLoader: false,
        ordersData: action.payload,
      };
    case "API_FAILURE":
      return {
        ...state,
        ordersLoader: false,
      };
    case "STOP_LOADER":
      return {
        ...state,
        ordersLoader: false,
      };
    default:
      return { ...orderstDefaultState };
  }
};
