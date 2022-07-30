import { Link, useNavigate } from 'react-router-dom';
import { HOMEPAGE, PRODUCTS } from '../../routes/routes';
import { categoryList } from '../../utility/constants';

export default function Drawer({ open, setOpen }) {
  const navigate = useNavigate();

  const handleRedirect = (category) => {
    navigate(PRODUCTS, { state: { category } });
    setOpen(false);
  };

  return (
    <div>
      <div className={`drawer flex-ct-ct ${open && 'drawer__open'}`}>
        <div
          className={`drawer__background ${open && 'drawer__open'}`}
          onClick={() => setOpen(false)}
        ></div>
        <div className='drawer__content' direction='left'>
          <h1 className='btn--float home xs-s'>
            <Link to={HOMEPAGE} className='md sb'>
              <i className='fas fa-home'></i>
            </Link>
          </h1>
          <hr />
          <section className='submenu__items flex-st-ct flex-vertical'>
            {categoryList.map((elem, index) => {
              return (
                <span
                  to={PRODUCTS}
                  className='submenu__item md sb'
                  onClick={handleRedirect.bind(this, elem.category)}
                  key={elem.name}
                >
                  {elem.name}
                </span>
              );
            })}
          </section>
          <hr />
        </div>
        <span className='drawer__close' onClick={() => setOpen(false)}>
          <i className='fas fa-times-circle'></i>
        </span>
      </div>
    </div>
  );
}
