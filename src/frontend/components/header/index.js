import './header.css';
import Category from './Category';
import { Banner } from './Banner';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../routes/routes';

export function Header() {
  const navigate = useNavigate();
  return (
    <header className='header'>
      <Category />
      <section className='features'>
        <div className='feature'>
          <span>
            <i className='fas fa-clipboard-list'></i>Direct delivery from UK to
            your home
          </span>
        </div>
        <div className='feature'>
          <span>
            <i className='fas fa-plane'></i>FREE DELIVERY ABOVE ₹1000
          </span>
        </div>
        <div className='feature'>
          <span>
            <i className='fas fa-download'></i>Download our app for exclusive
            offers
          </span>
        </div>
      </section>
      <Banner source='carousal-2.jpeg' />
      <div className='shortcuts mg-full'>
        <div
          onClick={() => navigate(PRODUCTS, { state: { category: 'combo' } })}
          className='shortcut btn--float'
        >
          Combos
        </div>
        <div
          onClick={() =>
            navigate(PRODUCTS, { state: { category: 'supplements' } })
          }
          className='shortcut btn--icons'
        >
          Supplements
        </div>
        <div
          onClick={() => navigate(PRODUCTS, { state: { category: 'snacks' } })}
          className='shortcut btn--primary'
        >
          Vegan
        </div>
        <div
          onClick={() =>
            navigate(PRODUCTS, { state: { category: 'clothing' } })
          }
          className='shortcut btn--float'
        >
          Clothing
        </div>
      </div>
    </header>
  );
}
