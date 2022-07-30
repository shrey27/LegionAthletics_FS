import { Fragment } from 'react';
import './wishlist.css';
import Category from '../../components/header/Category';
import { Navbar, Footer, Loader, Deals } from '../../components';
import { useWishlistCtx } from '../../context';

export default function Wishlist() {
  const { wishlistLoading, wishlistData } = useWishlistCtx();
  return (
    <Fragment>
      <Navbar />
      <Category />
      {wishlistLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {wishlistData.length <= 0 ? (
            <div>
              <img
                src='empty.webp'
                alt='empty'
                className='image__empty img--md'
              />
            </div>
          ) : (
            <Deals
              items={wishlistData}
              close={true}
              name='Wishlist Items'
              wishlist={true}
            />
          )}
        </Fragment>
      )}
      <Footer fixed={wishlistData.length === 0} />
    </Fragment>
  );
}
