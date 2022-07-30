import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from 'react';
import { PRODUCTSAPI } from '../routes/routes';
import axios from 'axios';
import { reducerFunction, productsDefaultState } from '../helpers/reducers';

const ProductsContext = createContext();

const useProductsCtx = () => useContext(ProductsContext);

const sortAndFilterItems = (
  list,
  includeOutOfStock,
  onlyFastDelivery,
  category,
  sortingDirection,
  rating,
  priceLimit,
  search
) => {
  let tempList = [...list];

  tempList = [
    ...tempList.filter((elem) => (includeOutOfStock ? true : !elem.nostock))
  ];

  if (search) {
    tempList = [
      ...tempList.filter((elem) => elem.title.toLowerCase().includes(search))
    ];
  }
  if (onlyFastDelivery) {
    tempList = [...tempList.filter((elem) => elem.fastdelivery)];
  }
  if (rating) {
    tempList = [...tempList.filter((elem) => elem.rating >= rating)];
  }
  if (priceLimit) {
    tempList = [...tempList.filter((elem) => elem.price <= priceLimit)];
  }
  if (category.length > 0) {
    tempList = [...tempList.filter((elem) => category.includes(elem.category))];
  }

  if (sortingDirection) {
    return sortingDirection === 'LOW_TO_HIGH'
      ? tempList.sort((a, b) => a['price'] - b['price'])
      : tempList.sort((a, b) => b['price'] - a['price']);
  } else {
    return tempList;
  }
};

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, productsDefaultState);
  const [productList, setProductList] = useState([]);

  const {
    includeOutOfStock,
    onlyFastDelivery,
    category,
    sortingDirection,
    rating,
    priceLimit,
    selectedInputs,
    search
  } = state;

  const filteredData = sortAndFilterItems(
    productList,
    includeOutOfStock,
    onlyFastDelivery,
    category,
    sortingDirection,
    rating,
    priceLimit,
    search
  );

  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(PRODUCTSAPI);
        setProductList(resp.data.products);
      } catch (err) {
        console.log('GET-PRODUCTS ERROR FROM USEEFFECT', err);
      }
    })();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        productListing: [...filteredData],
        includeOutOfStock,
        onlyFastDelivery,
        category,
        sortingDirection,
        rating,
        priceLimit,
        dispatch,
        selectedInputs
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProductId = (id) => {
  const { productListing } = useProductsCtx();
  return productListing.find((elem) => elem._id === id);
};

export { useProductId, useProductsCtx, ProductsContextProvider };
