import './checkout.css';
import { Fragment } from 'react';
import CheckoutCard from './CheckoutCard';
import { useCartAPICtx, useAuthCtx } from '../../context';
import { Loader, Navbar, Footer, ToastMessage } from '../../components';
import { CART, ORDER, PROFILEADDRESS } from '../../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/lalogo.jpg';

const loadScript = async (url) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;

    script.onload = () => {
      resolve(true);
      console.log('loaded');
    };

    script.onerror = () => {
      resolve(false);
      console.log('error');
    };

    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const {
    cartLoading,
    ordercart: {
      remainingAmount,
      cartList,
      totalAmount,
      totalDiscount,
      delivery,
      coupon
    },
    handleOrderPlaced
  } = useCartAPICtx();

  const { primaryDetails } = useAuthCtx();
  const navigate = useNavigate();

  const handleNavigation = () => {
    localStorage.setItem('checkout', true);
    navigate(PROFILEADDRESS);
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      ToastMessage('Payment Failed! Try again later', 'error');
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: remainingAmount * 100,
      currency: 'INR',
      name: 'Legion Athletics',
      description: 'Thank you for shopping with us',
      image: `${logo}`,
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        if (paymentId) {
          const tempObj = {
            cartList,
            amountPaid: remainingAmount,
            coupon,
            paymentId,
            orderDate: new Date(),
            eta: new Date(
              new Date().setDate(
                new Date().getDate() + Number(Math.random() * 10)
              )
            ),
            name: `${primaryDetails?.firstname} ${primaryDetails?.lastname}`,
            phone: primaryDetails?.phone,
            email: primaryDetails?.email,
            deliveryAddress: !primaryDetails.city
              ? `${primaryDetails?.address}`
              : `${primaryDetails?.address}, ${primaryDetails?.city}, ${primaryDetails?.stateLoc}, ${primaryDetails?.pincode}`
          };
          handleOrderPlaced(tempObj);
          navigate(ORDER);
        } else {
          ToastMessage('Payment Failed! Shop Again', 'error');
          navigate(CART);
        }
      },
      prefill: {
        name: `${primaryDetails?.firstname} ${primaryDetails?.lastname}`,
        email: `${primaryDetails?.email}`,
        contact: `${primaryDetails?.phone}`
      },
      notes: {
        address: `${primaryDetails?.address}, ${primaryDetails?.city}, ${primaryDetails?.state}, ${primaryDetails?.pincode}`
      },
      theme: {
        color: '#008190'
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Fragment>
      <Navbar />
      {!cartList?.length ? (
        <img src='empty.webp' alt='empty' className='image__empty img--md' />
      ) : (
        <div className='mg-full'>
          <h1 className='primary lg sb cen mg-full'>CHECKOUT SUMMARY</h1>
          <hr />
          <hr />
          <div className='flex-ct-ct mg-full'>
            <Link
              to={CART}
              className='card__status__cart sm cen sb mg-half xs-s'
            >
              Update Cart Items
            </Link>
            <span
              onClick={handleNavigation}
              className='card__status__address sm cen sb mg-half xs-s'
            >
              Update Delivery Details
            </span>
          </div>
          {cartLoading ? (
            <Loader />
          ) : (
            <div className='cart sm-s'>
              {/* Cart items */}
              <div className='cart__container'>
                {cartList &&
                  cartList.map((elem, index) => {
                    return <CheckoutCard key={index * 2} {...elem} />;
                  })}
              </div>

              {/* Pricing details */}
              <div className='cart__box shdw md-s'>
                <h1 className='md sb'>PRICE DETAILS</h1>
                <hr />
                <p className='mg-half'>
                  <span className='sm sb'>Cost</span>
                  <span className='sm sb fl-rt'>₹{totalAmount}</span>
                </p>
                <p className='mg-half'>
                  <span className='sm sb'>Discount</span>
                  <span className='sm sb fl-rt'>₹{totalDiscount}</span>
                </p>
                <p className='mg-half'>
                  <span className='sm sb'>Delivery</span>
                  <span className='sm sb fl-rt'>₹{delivery}</span>
                </p>
                {coupon?.couponDiscount > 0 && (
                  <p className='price mg-half'>
                    <span className='tag sm sb'>
                      <i className='fa-solid fa-tags'></i>
                      <span>{coupon.name}</span>
                    </span>
                    <span className='sm sb fl-rt'>
                      ₹{coupon.couponDiscount}
                    </span>
                  </p>
                )}
                <hr />
                <p className='mg-half'>
                  <span className='sm sb'>TOTAL</span>
                  <span className='sm sb fl-rt'>₹{remainingAmount}</span>
                </p>
                <hr />

                {/* Delivery Address Details */}
                <section className='sm-s'>
                  <h1 className='text--decoration price md sb cen'>
                    Delivery Address Details
                  </h1>
                  <h1 className='primary sm mg-half'>
                    <i className='fa-solid fa-user'></i>
                    <span>{`${primaryDetails?.firstname} ${primaryDetails?.lastname}`}</span>
                  </h1>

                  <div className='address__summary'>
                    <span className='primary sm sb'>
                      <i className='fa-solid fa-location-dot'></i>
                    </span>
                    <span className='primary sm sb'>
                      <span>
                        {!primaryDetails.city
                          ? `${primaryDetails?.address}`
                          : `${primaryDetails?.address}, ${primaryDetails?.city}, ${primaryDetails?.stateLoc}, ${primaryDetails?.pincode}`}
                      </span>
                    </span>
                  </div>

                  <h1 className='primary sm sb mg-half'>
                    <i className='fa-solid fa-mobile-screen-button'></i>
                    <span>{primaryDetails?.phone}</span>
                  </h1>
                  <h1 className='primary sm sb'>
                    <i className='fa-solid fa-envelope'></i>
                    <span>{primaryDetails?.email}</span>
                  </h1>
                </section>
                <button
                  className='btn btn--wide btn--dark mg-half bd'
                  onClick={() => displayRazorpay()}
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer fixed={!cartList?.length} />
    </Fragment>
  );
}
