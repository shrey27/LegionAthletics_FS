import '../cart/cart.css';
import { Fragment } from 'react';

export default function CheckoutCard(props) {
  const { source, title, price, mrp, qty, discount } = props;
  return (
    <Fragment>
      <div className='cart__landscape shdw'>
        <img src={source} alt='Banner' className='card__banner' />
        <section className='cart__content'>
          <h1 className='cart__align primary lg sb'>{title}</h1>
          <div className='cart__align'>
            <span className='tag md bl'>₹{price}</span>
            <span className='md xs-s bl price--sec'>₹{mrp}</span>
            <span className='md bl price'>{discount}% off</span>
            <h1 className='primary card__status__margin sm sb cen'>
              Quantity: {qty}
            </h1>
            <h1 className='tertiary sm cen mg-half'>
              <i className='fa-solid fa-arrow-rotate-left'></i>'7 days Return
              Policy'
            </h1>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
