import { Fragment, useEffect, useState } from 'react';
import './product.css';
import { Navbar, Footer } from '../../components';
import Category from '../../components/header/Category';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useWishlistCtx,
  useProductId,
  useCartCtx,
  useCartAPICtx
} from '../../context';
import { CART } from '../../routes/routes';

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = useProductId(productId);

  const { addToCart } = useCartCtx();
  const { addedCartPID } = useCartAPICtx();
  const { addToWishlist, addedPID } = useWishlistCtx();

  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product?._id) {
      if (addedPID && addedPID.includes(product._id)) setAddedToWishlist(true);
      else setAddedToWishlist(false);

      if (addedCartPID && addedCartPID.includes(product._id))
        setAddedToCart(true);
      else setAddedToCart(false);
    }
  }, [addedCartPID, addedPID, product]);

  const handleAddToWishlistClick = () => {
    if (!addedToWishlist) {
      const productToAdd = {
        ...product,
        _id: product?._id
      };
      addToWishlist(product?._id, productToAdd);
      setAddedToWishlist(true);
    }
  };

  const handleAddToCartClick = () => {
    if (!addedToCart) {
      const productToAdd = {
        ...product,
        _id: product?._id,
        count: product?.count ?? 1
      };
      addToCart(productToAdd);
      setAddedToCart(true);
    } else {
      navigate(CART);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <Category />

      <main className='product'>
        <div className='card card__product'>
          <img src={product?.source} alt='Banner' className='card__banner' />
          <section className='content xs-s'>
            <h1 className='primary lg bl xs-s cen'>{product?.title}</h1>
            <h1 className='highlight md sb cen mg-half'>{product?.Category}</h1>
            <p className='primary md sb cen mg-half'>{product?.description}</p>

            <ul className='stack'>
              <li className='product__stack__item xs-s'>
                <span className='primary lg sb price__val'>
                  Discount Price:&nbsp;₹{product?.price}
                </span>
                <span className='primary lg sb price--sec fl-rt'>
                  Price:&nbsp;₹{product?.mrp}
                </span>
              </li>
              <li className='product__stack__item xs-s'>
                <span className='tag lg sb'>
                  <i className='fa-solid fa-tags'></i>Upto {product?.discount}%
                  Off
                </span>
                <span className='content__rating__span sb fl-rt'>
                  {product?.rating}
                  <i className='fas fa-star'></i>
                </span>
              </li>
              <li className='product__stack__item xs-s'>
                {product?.type && <span className='type'>{product?.type}</span>}
                {product?.size && <span className='size'>{product?.size}</span>}
              </li>
            </ul>

            <h1 className='primary lg sb cen xs-s'>About the Product</h1>
            <p className='primary sm sb list--square sm-s'>
              We’re a leading sports nutrition brand, delivering a range of
              quality products including protein powder, vitamins and minerals,
              high-protein foods, snack alternatives, and performance clothing.
              At Myprotein, our aim is to fuel the ambitions of people across
              the world — making the best in sports nutrition available to
              everyone, whatever their goal. We pride ourselves in providing a
              broad selection of products at exceptional value to power this,
              including a range of dietary needs including vegetarian, vegan,
              dairy-free and gluten-free, so any customer can enjoy the benefits
              of high-quality nutrition.
            </p>

            {!product?.noStock ? (
              <div className='button__ctr'>
                <button
                  className={`btn ${
                    addedToCart ? 'btn--auth' : 'btn--auth--solid'
                  }`}
                  onClick={handleAddToCartClick}
                >
                  {addedToCart ? 'Go To Cart' : 'Add to Cart'}
                </button>
                <button
                  className={`btn ${
                    addedToWishlist ? 'btn--auth' : 'btn--error'
                  }`}
                  onClick={handleAddToWishlistClick}
                >
                  {addedToWishlist ? 'Added To Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            ) : (
              <div className='button__ctr'>
                <button
                  className={`btn--disabled btn btn--wide btn--margin`}
                  disabled
                >
                  Out Of Stock
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </Fragment>
  );
}
