import {Guitar} from '../../types/guitar';
import {Link, useHistory} from 'react-router-dom';

type GuitarCardProps = {
  guitar: Guitar,
  guitarRating: number,
}

function GuitarCard({guitar, guitarRating}: GuitarCardProps): JSX.Element {
  const history = useHistory();

  return (
    <div
      className="product-card"
      data-testid="product-card"
      onClick={() => {
        history.push(`/guitar/${guitar.id}`);
      }}
    >
      <img src={`../${guitar.previewImg}`} width="75" height="190" alt={guitar.name}/>
      <div className="product-card__info">
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
        <Link className="button button--mini" to={`/guitar/${guitar.id}`}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to={`/guitar/${guitar.id}`}>Купить</Link>
      </div>
    </div>
  );
}

export default GuitarCard;
