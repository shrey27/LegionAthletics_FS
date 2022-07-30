import { Fragment } from 'react';
import { Header, Navbar, Footer, Banner, Deals } from '../../components';
import './homepage.css';
import { homepageItems } from '../../utility/constants';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../routes/routes';

export default function LazyHomepage() {
  return (
    <Fragment>
      <Navbar />
      <Header />
      <Deals
        items={[...homepageItems].slice(0, 5)}
        name='Top Deals'
        noButton={true}
      />
      <Link to={PRODUCTS}>
        <Banner source='carousal-3.jpeg' />
      </Link>
      <Deals
        items={[...homepageItems].slice(-5)}
        name='Best-Sellers'
        noButton={true}
      />
      <div className='flex-ct-ct xs-s'>
        <Link className='btn btn--auth--solid btn--lg sb cen' to={PRODUCTS}>
          View All
        </Link>
      </div>
      <Footer />
    </Fragment>
  );
}
