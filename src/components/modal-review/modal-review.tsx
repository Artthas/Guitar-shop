import {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {postCurrentGuitarCommentAction} from '../../store/api-actions';
import {CommentPost} from '../../types/comment';
import {Guitar} from '../../types/guitar';
import {useDispatch} from 'react-redux';

type ModalReviewParams = {
  isActive: string,
  onCloseReviewClick(): void,
  currentGuitar: Guitar,
  currentGuitarId: number,
  onSuccess(): void,
  onReviewOverlayClick(): void,
};

function ModalReview({isActive, onCloseReviewClick, currentGuitar, currentGuitarId, onSuccess, onReviewOverlayClick}: ModalReviewParams): JSX.Element {

  const dispatch = useDispatch();

  const [review, setReview] = useState({
    'guitarId': currentGuitarId,
    'userName': '',
    'advantage': '',
    'disadvantage': '',
    'comment': '',
    'rating': 0,
  });

  const [rateMessage, setRateMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [advantagesMessage, setAdvantagesMessage] = useState('');
  const [disadvantagesMessage, setDisadvantagesMessage] = useState('');
  const [commentMessage, setCommentMessage] = useState('');

  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isActive !== '') {
      document.querySelector('.form-search__input')?.setAttribute('tabindex', '-1');
    } else if (isActive === '') {
      document.querySelector('.form-search__input')?.removeAttribute('tabindex');
    }
  }, [isActive]);

  const onSubmitButtonClick = () => {
    setRateMessage(review.rating === 0 ? 'Поставьте оценку' : '');
    setNameMessage(review.userName === '' ? 'Заполните поле' : '');
    setAdvantagesMessage(review.advantage === '' ? 'Заполните поле' : '');
    setDisadvantagesMessage(review.disadvantage === '' ? 'Заполните поле' : '');
    setCommentMessage(review.comment === '' ? 'Заполните поле' : '');
  };

  const onSubmit = ({guitarId, userName, advantage, disadvantage, comment, rating}: CommentPost) => {
    dispatch(postCurrentGuitarCommentAction({guitarId, userName, advantage, disadvantage, comment, rating}, onSuccess));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      guitarId: review.guitarId,
      userName: review.userName,
      advantage: review.advantage,
      disadvantage: review.disadvantage,
      comment: review.comment,
      rating: review.rating,
    });
  };

  const userNameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (evt.target.value !== '') {
      setNameMessage('');
    }
    setReview((prevState) => ({...prevState, 'userName': evt.target.value}));
  };

  const ratingHandler = (rating: number) => {
    if (rating > 0) {
      setRateMessage('');
    }
    setReview((prevState) => ({...prevState, 'rating': rating}));
  };

  const advantageHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (evt.target.value !== '') {
      setAdvantagesMessage('');
    }
    setReview((prevState) => ({...prevState, 'advantage': evt.target.value}));
  };

  const disadvantageHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (evt.target.value !== '') {
      setDisadvantagesMessage('');
    }
    setReview((prevState) => ({...prevState, 'disadvantage': evt.target.value}));
  };

  const commentHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    if (evt.target.value !== '') {
      setCommentMessage('');
    }
    setReview((prevState) => ({...prevState, 'comment': evt.target.value}));
  };

  return (
    <div className={`modal${isActive}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onReviewOverlayClick}></div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{currentGuitar.name}</h3>
          <form className="form-review" onSubmit={handleSubmit}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" onChange={userNameHandler} required data-testid="user-name"/>
                <span className="form-review__warning">{nameMessage}</span>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" onClick={() => ratingHandler(5)} required/>
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" onClick={() => ratingHandler(4)} required/>
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" onClick={() => ratingHandler(3)} required/>
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" onClick={() => ratingHandler(2)} required/>
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" onClick={() => ratingHandler(1)} required/>
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                  <span className="rate__count"></span>
                  <span className="rate__message">{rateMessage}</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="user-name">Достоинства</label>
            <input className="form-review__input" id="pros" type="text" autoComplete="off" onChange={advantageHandler} required data-testid="advantages"/>
            <span className="form-review__warning">{advantagesMessage}</span>
            <label className="form-review__label" htmlFor="user-name">Недостатки</label>
            <input className="form-review__input" id="user-name" type="text" autoComplete="off" onChange={disadvantageHandler} required/>
            <span className="form-review__warning">{disadvantagesMessage}</span>
            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off" onChange={commentHandler} required></textarea>
            <span className="form-review__warning">{commentMessage}</span>
            <button className="button button--medium-20 form-review__button" type="submit" onClick={onSubmitButtonClick}>Отправить отзыв</button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={onCloseReviewClick}
          >
            <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalReview;
