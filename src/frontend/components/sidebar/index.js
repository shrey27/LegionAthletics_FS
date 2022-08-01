import { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import {
  CART,
  ORDER,
  WISHLIST,
  PROFILE,
  PROFILEADDRESS
} from '../../routes/routes';
import { useAuthCtx } from '../../context';

export function Sidebar(props) {
  const { component } = props;
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { handleSignOut } = useAuthCtx();

  return (
    <div className='card profile__container shdw'>
      <div className='hb--box'>
        {/* header */}
        <header className='hb--header'>
          <nav className='navbar'>
            <section className='end xs-s'>
              <span
                className='slider btn hb--btn'
                onClick={() => setOptionsOpen((e) => !e)}
              >
                Account&nbsp;<i className='fas fa-chevron-down'></i>
              </span>
            </section>
          </nav>
        </header>

        {/* aside container */}
        <aside
          className={`hb--aside sm-s shadow ${optionsOpen ? 'hb--open' : ''}`}
        >
          <div className='mg-full'>
            <h1 className='primary sm reg aside__title'>MY ACCOUNT</h1>
            <ul className='stack'>
              <Link to={PROFILE}>
                <li className='stack__item primary sm'>
                  Profile Settings <i className='fa-solid fa-chevron-right'></i>
                </li>
              </Link>
              <Link to={PROFILEADDRESS}>
                <li className='stack__item primary sm'>
                  Manage Address <i className='fa-solid fa-chevron-right'></i>
                </li>
              </Link>
            </ul>
          </div>
          <div className='mg-full'>
            <h1 className='primary sm reg aside__title'>MY STUFF</h1>
            <ul className='stack'>
              <Link to={CART}>
                <li className='stack__item primary sm'>
                  My Cart <i className='fa-solid fa-chevron-right'></i>
                </li>
              </Link>
              <Link to={ORDER}>
                <li className='stack__item primary sm'>
                  My Orders <i className='fa-solid fa-chevron-right'></i>
                </li>
              </Link>
              <Link to={WISHLIST}>
                <li className='stack__item primary sm'>
                  My Wishlist <i className='fa-solid fa-chevron-right'></i>
                </li>
              </Link>
            </ul>
          </div>
          <button
            className='btn btn--auth--solid btn--wide'
            onClick={handleSignOut}
          >
            Logout
          </button>
        </aside>

        {/* main container */}
        <main className='hb--main hb--open'>{component}</main>
      </div>
    </div>
  );
}
