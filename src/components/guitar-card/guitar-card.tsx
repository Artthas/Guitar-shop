import {Guitar} from '../../types/guitar';
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getGuitarsInCart} from '../../store/guitars-data/selectors';

type GuitarCardProps = {
  guitar: Guitar,
  guitarRating: number,
  onBuyClick(addingGuitar: Guitar): void,
}

function GuitarCard({guitar, guitarRating, onBuyClick}: GuitarCardProps): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);

  const history = useHistory();

  let result;

  if (guitarsInCart) {
    result = guitarsInCart.find((guitarItem) => guitarItem.id === guitar.id);
  }

  return (
    <div className="product-card">
      <img
        src={`../${guitar.previewImg}`}
        width="75"
        height="190"
        alt={guitar.name}
        onClick={() => {
          history.push(`/guitar/${guitar.id}`);
        }}
        data-testid="product-card-img"
      />
      <div
        className="product-card__info"
        onClick={() => {
          history.push(`/guitar/${guitar.id}`);
        }}
      >
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          {[1, 2, 3, 4, 5].map((idx) => {
            if (idx > guitarRating) {
              return (
                <svg width="12" height="11" aria-hidden="true" key={idx}>
                  <use xlinkHref="#icon-star"></use>
                </svg>
              );
            } else {
              return (
                <svg width="12" height="11" aria-hidden="true" key={idx}>
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
              );
            }
          })}
          <span className="rate__count">{guitar.comments.length}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" data-testid="product-card-detailed" to={`/guitar/${guitar.id}`}>Подробнее</Link>
        {result ?
          <button className="button button--red-border button--mini button--in-cart" onClick={() => history.push('/cart')}>В корзине</button> :
          <button className="button button--red button--mini button--add-to-cart" onClick={() => onBuyClick(guitar)}>Купить</button>}
      </div>
    </div>
  );
}

export default GuitarCard;
