import { useAddressCtx, useAddressApiCtx } from '../../context/addressContext';
import './address.css';
import { addressError } from '../../utility/constants';

export default function AddressForm() {
  const {
    firstname,
    lastname,
    phone,
    email,
    address,
    city,
    stateLoc,
    pincode,
    errorFields,
    dispatch,
    validationAddress,
    handleFormCancel
  } = useAddressCtx();
  const { addressForm, addNewAddress } = useAddressApiCtx();

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const addObject = {
      firstname,
      lastname,
      phone,
      email,
      address,
      city,
      stateLoc,
      pincode
    };
    if (validationAddress(addObject)) {
      addNewAddress(addObject);
      handleFormCancel();
    }
  };

  return (
    <div className='card addressform shdw'>
      <h1 className='lg sb cen xs-s mg-full'>ADD NEW ADDRESS</h1>
      <hr />
      <form
        className='address__form sm-s'
        onSubmit={handleAddressSubmit}
        onReset={handleFormCancel}
      >
        <div className='address_input_one'>
          <label htmlFor='firstname' className='label'>
            First Name
          </label>
          <input
            className='input sm-s'
            type='text'
            name='firstname'
            id='firstname'
            autoComplete='off'
            value={addressForm?.firstname ?? firstname}
            onChange={(e) =>
              dispatch({ type: 'SET_FIRSTNAME', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('firstname') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_two'>
          <label htmlFor='lastname' className='label'>
            Last Name
          </label>
          <input
            className='input sm-s'
            type='text'
            name='lastname'
            id='lastname'
            autoComplete='off'
            value={addressForm?.lastname ?? lastname}
            onChange={(e) =>
              dispatch({ type: 'SET_LASTNAME', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('lastname') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_three'>
          <label htmlFor='addr__email' className='label'>
            Email
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__email'
            id='addr__email'
            autoComplete='off'
            value={addressForm?.email ?? email}
            onChange={(e) =>
              dispatch({ type: 'SET_EMAIL', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('email') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_four'>
          <label htmlFor='addr__phone' className='label'>
            Phone
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__phone'
            id='addr__phone'
            autoComplete='off'
            value={addressForm?.phone ?? phone}
            onChange={(e) =>
              dispatch({ type: 'SET_PHONE', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('phone') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_five'>
          <label htmlFor='addr' className='label'>
            Address
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr'
            id='addr'
            autoComplete='off'
            value={addressForm?.address ?? address}
            onChange={(e) =>
              dispatch({ type: 'SET_ADDRESS', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('address') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_six'>
          <label htmlFor='addr__city' className='label'>
            City
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__city'
            id='addr__city'
            autoComplete='off'
            value={addressForm?.city ?? city}
            onChange={(e) =>
              dispatch({ type: 'SET_CITY', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('city') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_seven'>
          <label htmlFor='addr__state' className='label'>
            State
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__state'
            id='addr__state'
            autoComplete='off'
            value={addressForm?.state ?? stateLoc}
            onChange={(e) =>
              dispatch({ type: 'SET_STATE', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('stateLoc') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_eight'>
          <label htmlFor='addr__pincode' className='label'>
            PINCODE
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__pincode'
            id='addr__pincode'
            autoComplete='off'
            value={addressForm?.pincode ?? pincode}
            onChange={(e) =>
              dispatch({ type: 'SET_PINCODE', payload: e.target.value })
            }
            onFocus={() => dispatch({ type: 'CLEAR_ERRORS' })}
          />
          {errorFields?.includes('pincode') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <button type='submit' className='btn btn--auth--solid sb'>
          SUBMIT
        </button>
        <button type='reset' className='btn btn--error--solid sb'>
          CANCEL
        </button>
      </form>
    </div>
  );
}
