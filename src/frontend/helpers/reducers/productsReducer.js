export const productsDefaultState = {
  includeOutOfStock: false,
  onlyFastDelivery: false,
  category: [],
  sortingDirection: '',
  rating: 0,
  priceLimit: 10000,
  search: '',
  selectedInputs: []
};

export const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_OUT_OF_STOCK':
      return {
        ...state,
        includeOutOfStock: !state.includeOutOfStock,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'TOGGLE_ONLY_FAST_DELIVERY':
      return {
        ...state,
        onlyFastDelivery: !state.onlyFastDelivery,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        category: state.category.concat(action.payload),
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        category:
          action.payload && state.category.filter((e) => e !== action.payload),
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'SET_SORTING_DIRECTION':
      return {
        ...state,
        sortingDirection: action.payload,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'SET_RATING':
      return {
        ...state,
        rating: action.payload,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'SET_PRICE_LIMIT':
      return {
        ...state,
        priceLimit: action.payload,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'NAVBAR_ITEM_SEARCH':
      return {
        ...state,
        search: action.payload
      };
    case 'NAVBAR_SEARCH_CLEAR':
      return {
        ...state,
        search: ''
      };
    case 'CLEAR_ALL':
      return {
        ...productsDefaultState
      };
    default:
      return {
        ...state
      };
  }
};
