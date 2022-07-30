import axios from 'axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { WISHLISTAPI } from '../routes/routes';
import { useAuthCtx } from './authenticationContext';
import { ToastMessage } from '../components/toast';
import { useLocalStorage } from '../helpers';
import {
  wishlistApiReducerFunc,
  wishlistDefaultState
} from '../helpers/reducers';

const WishListContext = createContext();

const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    wishlistApiReducerFunc,
    wishlistDefaultState
  );
  const { wishlistLoading, wishlistData, addedPID, wishListError } = state;
  const { token } = useAuthCtx();
  const { updateLocalStorage } = useLocalStorage();

  const addToWishlist = async (_id, objectData) => {
    dispatch({ type: 'API_REQUEST' });
    if (!addedPID.includes(_id)) {
      try {
        console.log('data before post call', _id, objectData, token);
        const {
          data: { wishlist }
        } = await axios.post(
          WISHLISTAPI,
          {
            product: {
              _id,
              ...objectData
            }
          },
          {
            headers: {
              authorization: token
            }
          }
        );
        updateLocalStorage('wishlist', wishlist);
        dispatch({ type: 'API_RESPONSE', payload: wishlist });
        const idArray = wishlist.map((elem) => elem._id);
        dispatch({ type: 'UPDATE_WISHLIST_PID', payload: idArray });
        ToastMessage('Product added to wishlist', 'success');
      } catch (err) {
        console.log('POST-WISHLIST-ERROR', err);
        dispatch({ type: 'API_FAILURE' });
        ToastMessage('Product not added to wishlist', 'error');
      }
    } else {
      deleteFromWishlist(_id);
    }
  };

  const deleteFromWishlist = async (id) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const {
        data: { wishlist }
      } = await axios.delete(`${WISHLISTAPI}/${id}`, {
        headers: {
          authorization: token
        }
      });
      updateLocalStorage('wishlist', wishlist);
      dispatch({ type: 'API_RESPONSE', payload: wishlist });

      const idArray = wishlist.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_WISHLIST_PID', payload: idArray });

      ToastMessage('Product deleted from wishlist', 'info');
    } catch (err) {
      console.log('DELETE-WISHLIST-ERROR', err);
      dispatch({ type: 'API_FAILURE' });
      ToastMessage('Product not deleted from wishlist', 'error');
    }
  };

  useEffect(() => {
    const getWishlist = async () => {
      dispatch({ type: 'API_REQUEST' });
      try {
        const {
          data: { wishlist }
        } = await axios.get(WISHLISTAPI, {
          headers: {
            authorization: token
          }
        });
        dispatch({ type: 'API_RESPONSE', payload: [...wishlist] });
        const idArray = wishlist.map((elem) => elem._id);
        dispatch({ type: 'UPDATE_WISHLIST_PID', payload: idArray });
      } catch (err) {
        console.log('GET-WISHLIST-ERROR', err);
        dispatch({ type: 'API_FAILURE' });
      }
    };
    if (token) getWishlist();
  }, [token]);

  return (
    <WishListContext.Provider
      value={{
        addedPID,
        wishlistLoading,
        wishlistData,
        addToWishlist,
        wishListError,
        deleteFromWishlist
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
const useWishlistCtx = () => useContext(WishListContext);

export { useWishlistCtx, WishlistProvider };
