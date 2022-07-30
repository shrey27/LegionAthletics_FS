import './authentication.css';
import { Fragment } from 'react';

export default function ChangePassword() {
  return (
    <Fragment>
      <div className='card authentication shdw'>
        <h1 className='lg sb cen xs-s mg-full'>UPDATE PASSWORD</h1>
        <hr />
        <form action='#' className='sm-s'>
          <div className='authentication__input'>
            <label for='old__password__change' className='label'>
              Current Password
            </label>
            <input
              className='input sm-s'
              type='password'
              name='old__password__change'
              id='old__password__change'
              autoComplete='off'
              placeholder='Password'
              required
            />
          </div>
          <div className='authentication__input'>
            <label for='new__password__change' className='label'>
              New Password
            </label>
            <input
              className='input sm-s'
              type='password'
              name='new__password__change'
              id='new__password__change'
              autoComplete='off'
              placeholder='Password'
              required
            />
          </div>
          <div className='authentication__input'>
            <label for='cnf__password__change' className='label'>
              Confirm Password
            </label>
            <input
              className='input sm-s'
              type='password'
              name='cnf__password__change'
              id='cnf__password__change'
              autoComplete='off'
              placeholder='Password'
              required
            />
          </div>
          <button type='submit' className='btn btn--wide btn--auth--solid sb'>
            UPDATE
          </button>
        </form>
      </div>
    </Fragment>
  );
}
