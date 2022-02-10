import {Comments} from '../../types/comment';
import {MONTHS} from '../../const';

type GuitarPageReviewsParams = {
  currentGuitarComments: Comments,
  count: number,
  currentGuitarCommentsLength: number,
  onShowMoreClick(): void,
  onSendReviewClick(): void,
};

function GuitarPageReviews({currentGuitarComments, count, currentGuitarCommentsLength, onShowMoreClick, onSendReviewClick}: GuitarPageReviewsParams): JSX.Element {
  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button
        className="button button--red-border button--big reviews__sumbit-button"
        onClick={onSendReviewClick}
      >
        Оставить отзыв
      </button>
      {currentGuitarComments.map((comment) =>
        (
          <div className="review" key={comment.id}>
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4><span className="review__date">{new Date(comment.createAt).getDate()} {MONTHS[new Date(comment.createAt).getMonth()]}</span>
            </div>
            <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              {[1, 2, 3, 4, 5].map((idx) => {
                if (idx > comment.rating) {
                  return (
                    <svg width="16" height="16" aria-hidden="true" key={idx}>
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  );
                } else {
                  return (
                    <svg width="16" height="16" aria-hidden="true" key={idx}>
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                  );
                }
              })}
              <span className="rate__count"></span>
              <span className="rate__message"></span>
            </div>
            <h4 className="review__title title title--lesser">Достоинства:</h4>
            <p className="review__value">{comment.advantage}</p>
            <h4 className="review__title title title--lesser">Недостатки:</h4>
            <p className="review__value">{comment.disadvantage}</p>
            <h4 className="review__title title title--lesser">Комментарий:</h4>
            <p className="review__value">{comment.comment}</p>
          </div>
        ),
      )}
      {count < currentGuitarCommentsLength &&
        <button
          className="button button--medium reviews__more-button"
          onClick={onShowMoreClick}
        >
          Показать еще отзывы
        </button>}
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

export default GuitarPageReviews;
