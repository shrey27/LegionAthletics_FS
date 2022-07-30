import './summary.css';
import { Fragment, useState, useEffect } from 'react';
import { HOMEPAGE } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { months } from '../../utility/constants';

export default function SummaryCard(props) {
  const {
    status,
    source,
    title,
    price,
    qty,
    discount,
    name,
    phone,
    email,
    amountPaid,
    orderDate,
    eta,
    deliveryAddress
  } = props;

  const [dateOfOrder, setDateOfOrder] = useState({
    date: 0,
    month: '',
    year: 0
  });
  const [etaDate, setEtaDate] = useState({ date: 0, month: '', year: 0 });

  useEffect(() => {
    setDateOfOrder({
      date: orderDate.getDate(),
      month: months[orderDate.getMonth()],
      year: orderDate.getFullYear()
    });
    setEtaDate({
      date: eta.getDate(),
      month: months[eta.getMonth()],
      year: eta.getFullYear()
    });
  }, [orderDate, eta]);

  return (
    <Fragment>
      <div className='card card__summary landscape shdw xs-s'>
        <img src={source} alt='Banner' className='summary card__banner' />
        <section className='card__status xs-s'>
          <h1 className='card__status__margin tag md sb cen'>ORDER DETAILS</h1>
          <h1 className='card__status__margin md sb primary cen'>
            OrderId: {Math.trunc(Math.random() * 1000)}
          </h1>
          <h1 className='card__status__margin primary md sb cen'>{title}</h1>
          <h1 className='card__status__margin md sb cen'>Quantity: {qty}</h1>

          <h1 className='card__status__margin md sb primary cen'>
            Order placed on:&nbsp;
            {`${dateOfOrder.month} ${
              dateOfOrder.date < 10 ? '0' + dateOfOrder.date : dateOfOrder.date
            }, ${dateOfOrder.year}`}
          </h1>
          {status !== 'Cancelled' && (
            <h1 className='card__status__margin md sb price cen'>
              {status !== 'Delivered' ? 'ETA' : 'Date of Delivery'}:{' '}
              {`${etaDate.month} ${
                etaDate.date < 10 ? '0' + etaDate.date : etaDate.date
              }, ${etaDate.year}`}
            </h1>
          )}
          <h1 className='tag sm cen mg-half'>
            <i className='fa-solid fa-arrow-rotate-left'></i>'7 days Return
            Policy'
          </h1>
        </section>

        <section className='card__address sm-s'>
          <h1 className='text--decoration price md sb cen'>Delivery Address</h1>
          <h1 className='primary sm mg-half'>
            <i className='fa-solid fa-user'></i>
            <span>{name}</span>
          </h1>

          <div className='address__summary'>
            <span className='primary sm sb'>
              <i className='fa-solid fa-location-dot'></i>
            </span>
            <span className='primary sm sb add__align'>
              <span>{deliveryAddress}</span>
            </span>
          </div>

          <h1 className='primary sm sb mg-half'>
            <i className='fa-solid fa-mobile-screen-button'></i>
            <span>{phone}</span>
          </h1>
          <h1 className='primary sm sb'>
            <i className='fa-solid fa-envelope'></i>
            <span>{email}</span>
          </h1>

          <h1 className='card__status__mode sm cen mg-half xs-s'>
            Payment Successfull
          </h1>
        </section>

        <section className='card__payment'>
          <h1 className='text--decoration price cen md sb'>Payment Summary</h1>
          <div className='align'>
            <p className='mg-half'>
              <span className='sm sb'>Price</span>
              <span className='sm sb fl-rt'>₹{price * qty}</span>
            </p>
            <p className='mg-half'>
              <span className='sm sb'>Discount</span>
              <span className='sm sb fl-rt'>
                ₹{price * qty * (discount / 100)}
              </span>
            </p>
            <p className='mg-half'>
              <span className='sm sb'>Delivery</span>
              <span className='sm sb fl-rt'>
                ₹{amountPaid < 10000 ? 500 : 0}
              </span>
            </p>
            <p className='mg-half'>
              <span className='md sb'>TOTAL</span>
              <span className='md sb fl-rt'>
                ₹{price * qty * (1 - discount / 100)}
              </span>
            </p>
          </div>
          <div className='flex-ct-ct'>
            <Link to={HOMEPAGE} className='btn btn--auth--solid btn--wide sb'>
              Shop Again
            </Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
