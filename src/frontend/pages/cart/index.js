import './cart.css';
import { Fragment, useEffect, useState } from 'react';
import { Navbar, Footer, Loader } from '../../components';
import Category from '../../components/header/Category';
import CartItem from './CartItem';
import { useCartAPICtx } from '../../context';
import { CHECKOUT } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartListData, cartError, dispatch } = useCartAPICtx();
  const navigate = useNavigate();
  const [cartPrice, setCartPrice] = useState({
    total: 0,
    discount: 0,
    coupon: 0,
    net: 0,
    delivery: 0
  });
  const [coupon, setCoupon] = useState({
    name: '',
    couponDiscount: 0
  });

  const handleApplyCoupon = (e) => {
    setCoupon({ name: e?.target?.id, couponDiscount: e?.target?.value });
  };

  const handleRemoveCoupon = () => {
    setCoupon({ name: '', couponDiscount: 0 });
  };

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartListData.reduce((acc, curr) => {
        return acc + curr.price * curr.qty;
      }, 0);
      const discount = cartListData.reduce((acc, curr) => {
        return acc + (curr.qty * curr.price * curr.discount) / 100;
      }, 0);
      const delivery = total - discount > 10000 ? 0 : 500;
      let net = total - discount + delivery - coupon?.couponDiscount;
      return {
        total,
        discount,
        net,
        delivery,
        couponValue: coupon?.couponDiscount
      };
    };
    const cartPriceObject = calculateTotal();

    setCartPrice(cartPriceObject);
  }, [cartListData, coupon]);

  const proceedFunction = () => {
    const cartArray = cartListData.map((elem) => {
      const productTotal = elem.price * elem.qty;
      const discountOnProduct = productTotal * (elem.discount / 100);
      const delivery = productTotal > 10000 ? 0 : 500;
      return { ...elem, productTotal, discountOnProduct, delivery };
    });
    dispatch({
      type: 'CHECKOUT_DETAILS',
      payload: {
        remainingAmount: cartPrice.net,
        totalAmount: cartPrice.total,
        totalDiscount: cartPrice.discount,
        delivery: cartPrice.delivery,
        coupon,
        cartList: [...cartArray]
      }
    });
    navigate(CHECKOUT);
  };

  return (
    <>
      <Navbar />
      <Category />
      {!cartListData ? (
        <Loader />
      ) : (
        <Fragment>
          {cartError ? (
            <h1 className='tag md cen sb mg-full'>{cartError}</h1>
          ) : cartListData.length === 0 ? (
            <img
              src='empty.webp'
              alt='empty'
              className='image__empty img--md'
            />
          ) : (
            <div className='cart sm-s'>
              <div className='cart__container'>
                {cartListData &&
                  cartListData.map((elem, index) => {
                    return <CartItem key={index * 2} {...elem} />;
                  })}
              </div>
              <div className='cart__box shdw md-s'>
                <h1 className='md sb'>PRICE DETAILS</h1>
                <hr />
                <p className='mg-half'>
                  <span className='sm sb'>Cost</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.total}</span>
                </p>
                <p className='mg-half'>
                  <span className='sm sb'>Discount</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.discount}</span>
                </p>
                <p className='mg-half'>
                  <span className='sm sb'>Delivery</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.delivery}</span>
                </p>
                {coupon?.couponDiscount > 0 && (
                  <p className='price mg-half'>
                    <span className='sm sb'>
                      <i className='fa-solid fa-tags'></i>
                      <span>Applied Coupon</span>
                    </span>
                    <span className='sm sb fl-rt'>
                      ₹{cartPrice.couponValue}
                    </span>
                  </p>
                )}
                <hr />
                <p className='mg-half'>
                  <span className='sm sb'>TOTAL</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.net}</span>
                </p>
                <hr />
                <div>
                  <span className='coupon__title'>Apply a Coupon</span>
                  {coupon?.name.length > 0 && (
                    <span
                      className='coupon__remove'
                      onClick={handleRemoveCoupon}
                    >
                      Remove
                    </span>
                  )}
                  <ul className='stack coupon__list'>
                    <li className=' coupon__item'>
                      <label>
                        <h1>ATHLETICS200</h1>
                        <p>Get flat ₹200 off on shopping above ₹1000</p>
                        <input
                          type='radio'
                          name='coupon'
                          id='ATHLETICS200'
                          value='200'
                          onChange={handleApplyCoupon}
                        />
                      </label>
                    </li>
                    <li className=' coupon__item'>
                      <label>
                        <h1>LEGION100</h1>
                        <p>Get flat ₹100 off on shopping above ₹500</p>
                        <input
                          type='radio'
                          name='coupon'
                          id='LEGION100'
                          value='100'
                          onChange={handleApplyCoupon}
                        />
                      </label>
                    </li>
                    <li className=' coupon__item'>
                      <label>
                        <h1>FIT50</h1>
                        <p>Get ₹50 off on your total price</p>
                        <input
                          type='radio'
                          name='coupon'
                          id='FIT50'
                          value='50'
                          onChange={handleApplyCoupon}
                        />
                      </label>
                    </li>
                  </ul>
                </div>
                <hr />
                <button
                  className='btn btn--wide btn--dark mg-half bd'
                  onClick={proceedFunction}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          )}
        </Fragment>
      )}
      <Footer fixed={!cartListData.length} />
    </>
  );
}
