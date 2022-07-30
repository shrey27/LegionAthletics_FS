import './header.css';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../routes/routes';
import { categoryList } from '../../utility/constants';

export default function Category() {
  const navigate = useNavigate();
  const handleRedirect = (category) => {
    navigate(PRODUCTS, { state: { category } });
  };

  return (
    <section className='categories'>
      {categoryList.map((elem, index) => {
        return (
          <div key={index + elem} className='category'>
            <span
              className='link__tags'
              onClick={handleRedirect.bind(this, elem.category)}
            >
              {elem.name}
            </span>
          </div>
        );
      })}
    </section>
  );
}
