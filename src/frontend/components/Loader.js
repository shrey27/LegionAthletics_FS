import '../utility/styles.css';
import pic from '../assets/loader.gif';

export function Loader({ list }) {
  return <img src={pic} alt='loader' className='loader img--sm' />;
}
