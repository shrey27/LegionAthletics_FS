import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Signout from '../pages/authentication/Signout';
import Product from '../pages/product';
import Products from '../pages/products';
import Cart from '../pages/cart';
import Wishlist from '../pages/wishlist';
import HomePage from '../pages/homepage';
import Orders from '../pages/summary';
import Profile from '../pages/profile';
import Address from '../pages/address';
import Checkout from '../pages/checkout';

import MockAPI from '../../MockAPI';
import PrivateRoute from './PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/notfound';

//API endpoints
export const SIGNUPAPI = '/api/auth/signup';
export const SIGNINAPI = '/api/auth/login';
export const UPDATEDETAILS = '/api/auth/update';
export const PRODUCTSAPI = '/api/products';
export const WISHLISTAPI = '/api/user/wishlist';
export const CARTAPI = '/api/user/cart';
export const ADDRESS = '/api/user/address';

//Route paths
export const HOMEPAGE = '/';
export const PRODUCTS = '/products';
export const CART = '/cart';
export const WISHLIST = '/wishlist';
export const SIGNIN = '/signin';
export const SIGNUP = '/signup';
export const SIGNOUT = '/signout';
export const MOCKAPI = '/mock-api';
export const ORDER = '/orders';
export const PROFILE = '/profile';
export const PROFILEADDRESS = '/profile/address';
export const CHECKOUT = '/checkout';

export const availableRoutes = (
  <Routes>
    <Route path={HOMEPAGE} element={<HomePage />} />
    <Route path={PRODUCTS} element={<Products />} />
    <Route path={SIGNIN} element={<Signin />} />
    <Route path={SIGNUP} element={<Signup />} />
    <Route path={MOCKAPI} element={<MockAPI />} />
    <Route path={SIGNOUT} element={<Signout />} exact />

    <Route path={HOMEPAGE} element={<PrivateRoute />}>
      <Route path={CART} element={<Cart />} exact />
      <Route path={WISHLIST} element={<Wishlist />} exact />
      <Route path={`${PRODUCTS}/:productId`} element={<Product />} exact />
      <Route path={ORDER} element={<Orders />} exact />
      <Route path={PROFILE} element={<Profile />} exact />
      <Route path={PROFILEADDRESS} element={<Address />} exact />
      <Route path={CHECKOUT} element={<Checkout />} exact />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Routes>
);
