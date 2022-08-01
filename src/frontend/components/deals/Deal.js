import { useEffect, useState } from 'react';
import './deals.css';
import {
  useAuthCtx,
  useWishlistCtx,
  useCartCtx,
  useCartAPICtx
} from '../../context';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../routes/routes';
import { ToastMessage } from '../../components';

export default function Deal(props) {
  const { itemdata, wishlist, close, noButton } = props;
  const {
    _id,
    source,
    title,
    mrp,
    price,
    discount,
    rating,
    fastdelivery,
    count,
    nostock
  } = itemdata;

  const navigate = useNavigate();
  const { addToCart } = useCartCtx();
  const { addToWishlist, deleteFromWishlist, addedPID, wishlistLoading } =
    useWishlistCtx();
  const { addedCartPID } = useCartAPICtx();
  const { token } = useAuthCtx();

  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (addedCartPID && addedCartPID.includes(_id)) setAddedToCart(true);
    else setAddedToCart(false);
  }, [addedCartPID, _id]);

  useEffect(() => {
    if (addedPID && addedPID.includes(_id)) setAddedToWishlist(true);
    else setAddedToWishlist(false);
  }, [addedPID, _id]);

  const handleAddToWishlistClick = () => {
    if (!wishlistLoading) {
      if (token) {
        const productToAdd = {
          _id,
          source,
          title,
          price,
          discount,
          rating,
          nostock
        };
        addToWishlist(_id, productToAdd);
      } else {
        ToastMessage('You need to sign in first', 'info');
      }
    }
  };

  const handleAddToCartClick = () => {
    if (token) {
      const productToAdd = {
        _id,
        source,
        title,
        price,
        mrp,
        discount,
        rating,
        count: count ?? 1,
        nostock
      };
      addToCart(productToAdd);
    } else {
      ToastMessage('You need to sign in first', 'info');
    }
  };

  const handleNavigateToProducts = () => {
    navigate(PRODUCTS);
  };
  return (
    <div className={`card ecom ${nostock && 'nostock'}`}>
      {wishlist && !close && (
        <span className='card__dismiss' onClick={handleAddToWishlistClick}>
          {addedToWishlist ? (
            <i className='fa-solid fa-heart tag--clr'></i>
          ) : (
            <i className='fa-regular fa-heart tertiary'></i>
          )}
        </span>
      )}
      {close && (
        <span
          className='card__dismiss'
          onClick={deleteFromWishlist.bind(this, _id)}
        >
          <i
            className='fas fa-times-circle'
            style={{ color: 'var(--tertiary)' }}
          ></i>
        </span>
      )}
      <Link to={`${PRODUCTS}/${_id}`}>
        <img
          src={source}
          alt='Banner'
          className={`card__banner ${nostock && 'nostock'}`}
        />
      </Link>

      <section className='deal__content'>
        <h1 className='primary sm sb mg-half'>{title}</h1>
        <div className='price__ctr'>
          <span className='md sb price__val'>₹ {price}</span>
          <span className='tag sm'>
            <i className='fa-solid fa-tags'></i>
            Upto {discount}% Off
          </span>
        </div>
        <div className='price__ctr'>
          <span className='content__rating__span mg-half'>
            {rating}
            <i className='fas fa-star'></i>
          </span>
          {fastdelivery && (
            <span className='delivery sm'>
              <i className='fa-solid fa-truck'></i>Express-Delivery
            </span>
          )}
        </div>

        {nostock ? (
          <button
            className={`btn--disabled btn btn--wide btn--margin`}
            disabled={nostock}
          >
            Out of Stock
          </button>
        ) : (
          <>
            {noButton ? (
              <button
                className={`btn ${
                  addedToCart ? 'btn--auth' : 'btn--auth--solid'
                } btn--wide btn--margin`}
                onClick={handleNavigateToProducts}
              >
                Get Details
              </button>
            ) : (
              <button
                className={`btn ${
                  addedToCart ? 'btn--auth' : 'btn--auth--solid'
                } btn--wide btn--margin`}
                onClick={handleAddToCartClick}
              >
                {addedToCart ? 'Go To Cart' : 'Add to Cart'}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
}
