import './authentication.css';
import { useState } from 'react';
import { Navbar, Footer } from '../../components';
import { useAuthCtx } from '../../context';
import { Link } from 'react-router-dom';
import { SIGNIN } from '../../routes/routes';
import { testCredentials } from '../../utility/constants';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const {
    signUpEmail,
    signUpEmailError,
    signUpPassword,
    signUpPasswordError,
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    cnfPassword,
    cnfpasswordError,
    signUpAddress,
    signUpAddressError,
    phone,
    phoneError,
    signupError,
    dispatch,
    handleSignUp
  } = useAuthCtx();

  const onSignUpHandler = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  const onUsingTestCredentials = (e) => {
    e.preventDefault();
    dispatch({ type: 'SIGNUP-FIRSTNAME', payload: testCredentials.firstName });
    dispatch({ type: 'SIGNUP-LASTNAME', payload: testCredentials.lastName });
    dispatch({ type: 'SIGNUP-EMAIL', payload: testCredentials.email });
    dispatch({ type: 'SIGNUP-ADDRESS', payload: testCredentials.address });
    dispatch({ type: 'SIGNUP-PHONE', payload: testCredentials.phone });
    dispatch({ type: 'SIGNUP-PASSWORD', payload: testCredentials.password });
    dispatch({
      type: 'CONFIRM-PASSWORD',
      payload: testCredentials.confirmpassword
    });
  };

  return (
    <>
      <Navbar noDrawer={true} />
      {signupError && (
        <div className='card authentication shdw'>
          <h1 className='alert tag cen md sb'>{signupError}</h1>
        </div>
      )}
      <div className='card authentication shdw'>
        <h1 className='lg sb cen xs-s mg-full'>SIGN UP</h1>
        <hr />
        <form action='#' className='sm-s'>
          <div className='signup__ctr'>
            <div className='aside-left'>
              <div className='authentication__input'>
                <label htmlFor='firstname__signup' className='label'>
                  Enter Your First Name*
                </label>
                <input
                  className='input sm-s'
                  type='text'
                  name='firstname__signup'
                  id='firstname__signup'
                  placeholder='Enter your Name'
                  autoComplete='off'
                  value={firstName}
                  onChange={(e) =>
                    dispatch({
                      type: 'SIGNUP-FIRSTNAME',
                      payload: e.target.value
                    })
                  }
                  onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                  required
                />
                <h1 className='input__error'>{firstNameError}</h1>
              </div>
              <div className='authentication__input'>
                <label htmlFor='lastname__signup' className='label'>
                  Enter Your Last Name*
                </label>
                <input
                  className='input sm-s'
                  type='text'
                  name='lastname__signup'
                  id='lastname__signup'
                  placeholder='Enter your Name'
                  autoComplete='off'
                  value={lastName}
                  onChange={(e) =>
                    dispatch({
                      type: 'SIGNUP-LASTNAME',
                      payload: e.target.value
                    })
                  }
                  onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                  required
                />
                <h1 className='input__error'>{lastNameError}</h1>
              </div>
              <div className='authentication__input'>
                <label htmlFor='password__signup' className='label'>
                  Enter Password*
                </label>
                <div className='input__container'>
                  <input
                    className='input input__password sm-s'
                    type={showPassword ? 'text' : 'password'}
                    name='password__signup'
                    id='password__signup'
                    autoComplete='off'
                    placeholder='Enter Password'
                    value={signUpPassword}
                    onChange={(e) =>
                      dispatch({
                        type: 'SIGNUP-PASSWORD',
                        payload: e.target.value
                      })
                    }
                    onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                    required
                  />
                  <i
                    className='fa-solid fa-eye input__eye'
                    onClick={() => setShowPassword((e) => !e)}
                  ></i>
                </div>
                <h1 className='input__error'>{signUpPasswordError}</h1>
              </div>
            </div>

            <div className='aside-right'>
              <div className='authentication__input'>
                <label htmlFor='email__signup' className='label'>
                  Enter Your Email ID*
                </label>
                <input
                  className='input sm-s'
                  type='email'
                  name='email__signup'
                  id='email__signup'
                  placeholder='Enter Email'
                  autoComplete='off'
                  value={signUpEmail}
                  onChange={(e) =>
                    dispatch({ type: 'SIGNUP-EMAIL', payload: e.target.value })
                  }
                  onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                  required
                />
                <h1 className='input__error'>{signUpEmailError}</h1>
              </div>
              <div className='authentication__input'>
                <label htmlFor='phone__signup' className='label'>
                  Enter Your Phone Number*
                </label>
                <input
                  className='input sm-s'
                  type='text'
                  name='phone__signup'
                  id='phone__signup'
                  placeholder='Enter Phone Number'
                  autoComplete='off'
                  value={phone}
                  onChange={(e) =>
                    dispatch({ type: 'SIGNUP-PHONE', payload: e.target.value })
                  }
                  onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                  required
                />
                <h1 className='input__error'>{phoneError}</h1>
              </div>
              <div className='authentication__input'>
                <label htmlFor='cnf__password__signup' className='label'>
                  Confirm Password*
                </label>
                <div className='input__container'>
                  <input
                    className='input input__password sm-s'
                    type={showCnfPassword ? 'text' : 'password'}
                    name='cnf__password__signup'
                    id='cnf__password__signup'
                    autoComplete='off'
                    placeholder='Re-enter Password'
                    value={cnfPassword}
                    onChange={(e) =>
                      dispatch({
                        type: 'CONFIRM-PASSWORD',
                        payload: e.target.value
                      })
                    }
                    onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                    required
                  />
                  <i
                    className='fa-solid fa-eye input__eye'
                    onClick={() => setShowCnfPassword((e) => !e)}
                  ></i>
                </div>
                <h1 className='input__error'>{cnfpasswordError}</h1>
              </div>
            </div>
          </div>

          <div className='authentication__input'>
            <label htmlFor='address__signup' className='label'>
              Delivery Address Details*
            </label>
            <textarea
              className='textarea sm-s'
              type='text'
              name='address__signup'
              id='address__signup'
              placeholder='Address Details'
              autoComplete='off'
              value={signUpAddress}
              onChange={(e) =>
                dispatch({ type: 'SIGNUP-ADDRESS', payload: e.target.value })
              }
              onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
              required
            ></textarea>
            <h1 className='input__error'>{signUpAddressError}</h1>
          </div>
          <button
            type='submit'
            className='btn btn--wide btn--auth--solid sb'
            onClick={onSignUpHandler}
          >
            SIGN UP
          </button>
          <button
            className='btn btn--wide btn--auth sb'
            onClick={onUsingTestCredentials}
          >
            Fill Test Credentials
          </button>
        </form>
        <div className='signin__links'>
          <Link to={SIGNIN} className='already sm'>
            Already have an account?
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
