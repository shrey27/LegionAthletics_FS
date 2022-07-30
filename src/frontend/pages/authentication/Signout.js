import './authentication.css';
import { Navbar, Footer, Deals } from '../../components';
import { homepageItems } from '../../utility/constants';
import { Link } from 'react-router-dom';
import { HOMEPAGE, PRODUCTS } from '../../routes/routes';

export default function Signout() {
  return (
    <div>
      <Navbar />
      <h1 className='price lg cen mg-full'>
        You have Signed Out, Successfully!
      </h1>
      <div className='flex-ct-ct xs-s'>
        <Link className='btn btn--auth btn--lg sb cen' to={HOMEPAGE}>
          Go To Homepage
        </Link>
      </div>
      <Deals
        items={[...homepageItems].slice(-5)}
        name='Best-Sellers'
        noButton={true}
      />
      <div className='flex-ct-ct xs-s'>
        <Link className='btn btn--error btn--lg sb cen' to={PRODUCTS}>
          View All
        </Link>
      </div>
      <Footer />
    </div>
  );
}
