import './notfound.css';
import { Navbar, Footer } from '../../components';
import pic from '../../assets/notfound.gif';
import { Link } from 'react-router-dom';
import { HOMEPAGE } from '../../routes/routes';

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className='notfound'>
        <img src={pic} alt='notfound' className='notfound__image' />
        <h1 className='notfound__primary'>Oops! Looks like you are lost. </h1>
        <h1 className='notfound__secondary'>
          Check the URL you were trying to visit
        </h1>
        <h1 className='notfound__secondary'>or,</h1>
        <Link to={HOMEPAGE} className='btn btn--large btn--auth--solid md sb'>
          Go back to Homepage
        </Link>
      </div>
      <Footer fixed={true} />
    </div>
  );
}
