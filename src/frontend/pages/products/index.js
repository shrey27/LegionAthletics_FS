import React, { useState, useEffect } from 'react';
import './products.css';
import Category from '../../components/header/Category';
import { Navbar, Footer, Loader, Deals } from '../../components';
import { useProductsCtx } from '../../context';
import { useLocation } from 'react-router-dom';

export default function Products() {
  const location = useLocation();
  const [filterOpen, setFilterOpen] = useState(false);
  // const [products, setProducts] = useState([]);

  const {
    productListing,
    priceLimit,
    dispatch,
    includeOutOfStock,
    onlyFastDelivery,
    category,
    sortingDirection,
    rating
  } = useProductsCtx();

  const handleChange = (action) => {
    dispatch(action);
  };

  const handleClear = () => {
    handleChange({
      type: 'CLEAR_ALL'
    });
  };

  useEffect(() => {
    if (location?.state?.category) {
      dispatch({ type: 'ADD_CATEGORY', payload: location?.state?.category });
    }
    return () => dispatch({ type: 'CLEAR_ALL' });
  }, [location, dispatch]);

  return (
    <div className='container'>
      <Navbar showSearchBar={true} />
      <Category />

      <div className='hb--box'>
        {/* Header */}
        <header className='hb--header'>
          <nav className='navbar'>
            <section className='end xs-s'>
              <span
                className='slider btn hb--btn'
                onClick={() => setFilterOpen((e) => !e)}
              >
                Filter <i className='fas fa-chevron-down'></i>
              </span>
            </section>
          </nav>
        </header>

        {/* Filters */}
        <aside className={`hb--aside sm-s ${filterOpen ? 'hb--open' : ''}`}>
          <span className='primary sm sb'>FILTERS</span>
          <span
            className='primary sm reg fl-rt clear__btn'
            onClick={handleClear}
          >
            Clear All
          </span>

          <h1 className='primary sm sb mg-half'>Price</h1>

          <span className='primary sm sb'>₹ 500</span>
          <span className='primary sm sb fl-rt'>₹ {priceLimit}</span>

          <input
            className='filter__slider mg-half'
            type='range'
            id='price'
            name='price'
            step='500'
            min='500'
            max='10000'
            value={priceLimit}
            onChange={(e) =>
              handleChange({
                type: 'SET_PRICE_LIMIT',
                payload: e.target.value,
                target: e
              })
            }
          />

          <div className='filter__category mg-half'>
            <h1 className='primary sm sb'>Category</h1>
            <label htmlFor='supplements'>
              <input
                className='filter__ip'
                type='checkbox'
                name='supplements'
                id='supplements'
                checked={category.includes('supplements')}
                onChange={(e) =>
                  handleChange({
                    type: e.target.checked ? 'ADD_CATEGORY' : 'REMOVE_CATEGORY',
                    payload: 'supplements',
                    target: e
                  })
                }
              />{' '}
              Supplements
            </label>
            <label htmlFor='clothing'>
              <input
                className='filter__ip'
                type='checkbox'
                name='clothing'
                id='clothing'
                checked={category.includes('clothing')}
                onChange={(e) =>
                  handleChange({
                    type: e.target.checked ? 'ADD_CATEGORY' : 'REMOVE_CATEGORY',
                    payload: 'clothing',
                    target: e
                  })
                }
              />{' '}
              Clothing
            </label>
            <label htmlFor='combo'>
              <input
                className='filter__ip'
                type='checkbox'
                name='combo'
                id='combo'
                checked={category.includes('combo')}
                onChange={(e) =>
                  handleChange({
                    type: e.target.checked ? 'ADD_CATEGORY' : 'REMOVE_CATEGORY',
                    payload: 'combo',
                    target: e
                  })
                }
              />{' '}
              Combos
            </label>
            <label htmlFor='snacks'>
              <input
                className='filter__ip'
                type='checkbox'
                name='snacks'
                id='snacks'
                checked={category.includes('snacks')}
                onChange={(e) =>
                  handleChange({
                    type: e.target.checked ? 'ADD_CATEGORY' : 'REMOVE_CATEGORY',
                    payload: 'snacks',
                    target: e
                  })
                }
              />{' '}
              Vegan Snacks
            </label>
          </div>

          <div className='filter__rating mg-half'>
            <h1 className='primary sm sb'>Rating</h1>
            <label htmlFor='4star--above'>
              <input
                className='filter__ip'
                type='radio'
                name='rating'
                id='4star--above'
                checked={rating === 4}
                onChange={(e) =>
                  handleChange({
                    type: 'SET_RATING',
                    payload: 4,
                    target: e
                  })
                }
              />{' '}
              4 Star & above
            </label>
            <label htmlFor='3star--above'>
              <input
                className='filter__ip'
                type='radio'
                name='rating'
                id='3star--above'
                checked={rating === 3}
                onChange={(e) =>
                  handleChange({
                    type: 'SET_RATING',
                    payload: 3,
                    target: e
                  })
                }
              />{' '}
              3 Star & above
            </label>
            <label htmlFor='2star--above'>
              <input
                className='filter__ip'
                type='radio'
                name='rating'
                id='2star--above'
                checked={rating === 2}
                onChange={(e) =>
                  handleChange({
                    type: 'SET_RATING',
                    payload: 2,
                    target: e
                  })
                }
              />{' '}
              2 Star & above
            </label>
            <label htmlFor='1star--above'>
              <input
                className='filter__ip'
                type='radio'
                name='rating'
                id='1star--above'
                checked={rating === 1}
                onChange={(e) =>
                  handleChange({
                    type: 'SET_RATING',
                    payload: 1,
                    target: e
                  })
                }
              />{' '}
              1 Star & above
            </label>
          </div>

          <div className='filter__category mg-half'>
            <h1 className='primary sm sb'>Unavailable</h1>
            <label htmlFor='outOfStock'>
              <input
                className='filter__ip'
                type='checkbox'
                id='outOfStock'
                checked={includeOutOfStock}
                onChange={(e) =>
                  handleChange({
                    type: 'TOGGLE_OUT_OF_STOCK',
                    target: e
                  })
                }
              />{' '}
              Include Out of Stock
            </label>
          </div>

          <div className='filter__sorting mg-half'>
            <h1 className='primary sm sb'>Sort By</h1>
            <label>
              <input
                className='filter__ip'
                type='radio'
                name='sorting'
                id='hightolow'
                checked={sortingDirection === 'HIGH_TO_LOW'}
                onChange={(e) =>
                  handleChange({
                    type: 'SET_SORTING_DIRECTION',
                    payload: 'HIGH_TO_LOW',
                    target: e
                  })
                }
              />{' '}
              High to Low
            </label>
            <label>
              <input
                className='filter__ip'
                type='radio'
                name='sorting'
                id='lowtohigh'
                checked={sortingDirection === 'LOW_TO_HIGH'}
                onChange={(e) =>
                  handleChange({
                    type: 'SET_SORTING_DIRECTION',
                    payload: 'LOW_TO_HIGH',
                    target: e
                  })
                }
              />{' '}
              Low to High
            </label>
          </div>

          <div className='filter__category mg-half'>
            <h1 className='primary sm sb'>Fast - Delivery</h1>
            <label htmlFor='delivery'>
              <input
                className='filter__ip'
                type='checkbox'
                id='delivery'
                checked={onlyFastDelivery}
                onChange={(e) =>
                  handleChange({
                    type: 'TOGGLE_ONLY_FAST_DELIVERY',
                    target: e
                  })
                }
              />{' '}
              Express Delivery
            </label>
          </div>
        </aside>

        {/* Products Listing */}
        <main className='hb--main sm-s'>
          {!productListing ? (
            <Loader />
          ) : (
            <div>
              {productListing?.length ? (
                <Deals
                  items={productListing}
                  name={location?.state?.category ?? 'Products'}
                  wishlist={true}
                />
              ) : (
                <img
                  src='empty.webp'
                  alt='empty'
                  className='image__empty img--md'
                />
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
