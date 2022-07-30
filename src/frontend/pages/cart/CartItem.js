import './cart.css';
import { useCartCtx, useCartAPICtx, useWishlistCtx } from '../../context';

export default function CartItem(props) {
  const { _id, source, title, price, mrp, discount, qty } = props;
  const { incQty, decQty } = useCartCtx();
  const { addToWishlist } = useWishlistCtx();
  const { deleteFromCart, cartLoading } = useCartAPICtx();

  const handleMoveToWishlist = () => {
    addToWishlist(_id, { ...props });
    deleteFromCart(_id);
  };

  const decrementhandler = (_id, qty) => {
    if (!cartLoading) decQty(_id, qty);
  };

  const incrementhandler = (_id) => {
    if (!cartLoading) incQty(_id);
  };

  return (
    <div className='cart__landscape shdw'>
      <img src={source} alt='Banner' className='card__banner' />
      <section className='cart__content'>
        <h1 className='cart__align primary lg sb'>{title}</h1>
        <p className='cart__align'>
          <span className='tag sm sb price--pmy'>₹{price}</span>
          <span className='primary sm xs-s sb price--sec'>₹{mrp}</span>
          <span className='sm sb price'>{discount}% off</span>
        </p>
        <h1 className='cart__align'>
          {qty === 1 ? (
            <i
              className='fa-regular fa-trash-can btn qty--btn'
              name='del'
              onClick={decrementhandler.bind(this, _id, qty)}
            ></i>
          ) : (
            <i
              className='fas fa-minus btn qty--btn'
              name='dec'
              onClick={decrementhandler.bind(this, _id, qty)}
            ></i>
          )}
          <span className='quantity'>{qty}</span>
          <i
            className='fas fa-plus btn qty--btn'
            name='inc'
            onClick={incrementhandler.bind(this, _id)}
          ></i>
        </h1>
        <div className='btn--shift'>
          <button className='btn btn--auth' onClick={handleMoveToWishlist}>
            Move to Wishlist
          </button>
        </div>
      </section>
    </div>
  );
}
