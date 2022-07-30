import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from 'react';
import { ToastMessage } from '../components';
import axios from 'axios';
import { ADDRESS } from '../routes/routes';
import { useAuthCtx } from './authenticationContext';
import { addressReducerFunction, addressState } from '../helpers/reducers';

const AddressContext = createContext();
const AddressAPIContext = createContext();

const useAddressCtx = () => useContext(AddressContext);
const useAddressApiCtx = () => useContext(AddressAPIContext);

const AddressContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducerFunction, addressState);
  const [slide, setSlide] = useState(false);

  const handleFormCancel = () => {
    setSlide(false);
    dispatch({ type: 'CLEAR_FORM' });
  };

  const validationAddress = (addressObject) => {
    const {
      firstname,
      lastname,
      phone,
      email,
      address,
      city,
      stateLoc,
      pincode
    } = addressObject;
    const errors = [];
    if (!firstname) errors.push('firstname');
    if (!lastname) errors.push('lastname');
    if (!phone) errors.push('phone');
    if (!address) errors.push('address');
    if (!email) errors.push('email');
    if (!city) errors.push('city');
    if (!stateLoc) errors.push('stateLoc');
    if (!pincode) errors.push('pincode');

    if (errors.length) {
      dispatch({ type: 'ERROR_FIELDS', payload: [...errors] });
      return false;
    }
    return true;
  };

  return (
    <AddressContext.Provider
      value={{
        ...state,
        dispatch,
        validationAddress,
        handleFormCancel,
        slide,
        setSlide
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

const defaultState = {
  addressList: [],
  addressLoader: false,
  addressForm: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADDRESS_API_REQUEST':
      return {
        ...state,
        addressLoader: true
      };
    case 'ADDRESS_API_RESPONSE':
      const arr = action.payload;
      return {
        ...state,
        addressLoader: false,
        addressList: [...arr]
      };
    case 'ADDRESS_API_FAILURE':
      return {
        ...state,
        addressLoader: false
      };
    case 'ADDRESS_FORM__DATA':
      console.log('address form data', action.payload);
      return {
        ...state,
        addressForm: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

const AddressApiContextProvider = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, defaultState);
  const { token } = useAuthCtx();

  const addNewAddress = async (addObject) => {
    try {
      dispatcher({ type: 'ADDRESS_API_REQUEST' });
      const {
        data: { address }
      } = await axios.post(
        ADDRESS,
        { address: { ...addObject, type: 'HOME' } },
        {
          headers: {
            authorization: token
          }
        }
      );
      console.log(address);
      dispatcher({ type: 'ADDRESS_API_RESPONSE', payload: [...address] });
      ToastMessage('Address saved Successfully', 'success');
    } catch (err) {
      console.log('ADD new address api error', err);
      dispatcher({ type: 'ADDRESS_API_FAILURE' });
      ToastMessage('Address submission failed', 'error');
    }
  };

  const deleteAddress = async (id) => {
    try {
      dispatcher({ type: 'ADDRESS_API_REQUEST' });
      const {
        data: { address }
      } = await axios.delete(ADDRESS + '/' + id, {
        headers: {
          authorization: token
        }
      });
      dispatcher({ type: 'ADDRESS_API_RESPONSE', payload: [...address] });
      ToastMessage('Address Deleted Successfully', 'info');
    } catch (err) {
      console.log('Delete address api error', err);
      dispatcher({ type: 'ADDRESS_API_FAILURE' });
      ToastMessage('Address Deletion failed', 'error');
    }
  };

  useEffect(() => {
    const getAddressList = async () => {
      dispatcher({ type: 'ADDRESS_API_REQUEST' });
      try {
        const {
          data: { address }
        } = await axios.get(ADDRESS, {
          headers: {
            authorization: token
          }
        });
        dispatcher({ type: 'ADDRESS_API_RESPONSE', payload: [...address] });
      } catch (err) {
        console.log('GET-ADDRESS-ERROR', err);
        dispatcher({ type: 'ADDRESS_API_FAILURE' });
      }
    };
    if (token) getAddressList();
  }, [token]);

  return (
    <AddressAPIContext.Provider
      value={{
        ...state,
        addNewAddress,
        deleteAddress
      }}
    >
      <AddressContextProvider>{children}</AddressContextProvider>
    </AddressAPIContext.Provider>
  );
};

export { AddressApiContextProvider, useAddressCtx, useAddressApiCtx };
