import './deals.css';
import Deal from './Deal';

export function Deals({ items, name, wishlist, close, noButton }) {
  return (
    <section className='deals'>
      <h1 className='primary lg xs-s cen'>{name}</h1>
      <div className='deal--cards xs-s'>
        {items.map((elem, index) => {
          return (
            <Deal
              key={`${elem.id}__${index}`}
              itemdata={{ ...elem }}
              wishlist={wishlist}
              close={close}
              noButton={noButton}
            />
          );
        })}
      </div>
    </section>
  );
}
