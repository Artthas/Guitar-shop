import Header from '../header/header';
import Footer from '../footer/footer';
import {useParams, Link} from 'react-router-dom';
import {getCurrentGuitar} from '../../store/guitars-data/selectors';
import {getCurrentGuitarComments} from '../../store/guitars-other-data/selectors';
import {getGuitarsRating} from '../../store/guitars-data/selectors';
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {fetchCurrentGuitarAction, fetchCurrentGuitarCommentsAction} from '../../store/api-actions';
import GuitarPageReviews from '../guitar-page-reviews/guitar-page-reviews';
import {GUITAR_TYPES_RU, GUITAR_TYPES_EN} from '../../const';
import {MouseEvent} from 'react';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';

type GuitarPageParams = {
  guitarId: string;
};

function GuitarPage(): JSX.Element {
  const currentGuitar = useSelector(getCurrentGuitar);
  const currentGuitarComments = useSelector(getCurrentGuitarComments);
  const allGuitarsRating = useSelector(getGuitarsRating);

  const {guitarId} = useParams<GuitarPageParams>();

  const dispatch = useDispatch();

  const [tab, setTab] = useState<string>('Характеристики');
  const [count, setCountData] = useState(3);
  const [showedComments, setShowedComments] = useState(currentGuitarComments);
  const [reviewIsActive, setReviewIsActive] = useState('');
  const [reviewSuccessIsActive, setReviewSuccessIsActive] = useState('');

  useEffect(() => {
    dispatch(fetchCurrentGuitarAction(guitarId));
    dispatch(fetchCurrentGuitarCommentsAction(guitarId));
  }, [guitarId, dispatch]);

  let currentGuitarType;

  if (currentGuitar.type === GUITAR_TYPES_EN.electric) {
    currentGuitarType = GUITAR_TYPES_RU.electric;
  } else if (currentGuitar.type === GUITAR_TYPES_EN.ukulele) {
    currentGuitarType = GUITAR_TYPES_RU.ukulele;
  } else if (currentGuitar.type === GUITAR_TYPES_EN.acoustic) {
    currentGuitarType = GUITAR_TYPES_RU.acoustic;
  }

  const onCloseReviewEsc = (evt: KeyboardEvent) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      setReviewIsActive('');
      document.removeEventListener('keydown', onCloseReviewEsc);
      document.querySelector('body')?.setAttribute('style', 'overflow: visible');
    }
  };

  const onCloseSuccessReviewEsc = (evt: KeyboardEvent) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      setReviewSuccessIsActive('');
      document.removeEventListener('keydown', onCloseSuccessReviewEsc);
      document.querySelector('body')?.setAttribute('style', 'overflow: visible');
    }
  };

  useEffect(() => {
    const tempShowedComments = [...currentGuitarComments];
    tempShowedComments.sort((comment1, comment2) => new Date(comment2.createAt).getTime() - new Date(comment1.createAt).getTime());
    if (count < tempShowedComments.length) {
      setShowedComments(tempShowedComments.slice(0, count));
    } else {
      setShowedComments(tempShowedComments);
    }
  }, [count, currentGuitarComments]);

  useEffect(() => {
    if (reviewSuccessIsActive === '') {
      document.removeEventListener('keydown', onCloseSuccessReviewEsc);
    } else {
      document.addEventListener('keydown', onCloseSuccessReviewEsc);
    }
  });

  useEffect(() => {
    if (reviewIsActive === '') {
      document.removeEventListener('keydown', onCloseReviewEsc);
    } else {
      document.addEventListener('keydown', onCloseReviewEsc);
    }
  });

  const tabClickHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setTab(evt.currentTarget.innerHTML);
  };

  const onShowMoreClick = () => {
    setCountData(count + 3);
  };

  const onSendReviewClick = () => {
    setReviewIsActive(' is-active');
    document.querySelector('body')?.setAttribute('style', 'overflow: hidden');
  };

  const onCloseReviewClick = () => {
    setReviewIsActive('');
    document.removeEventListener('keydown', onCloseReviewEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onCloseSuccessReviewClick = () => {
    setReviewSuccessIsActive('');
    document.removeEventListener('keydown', onCloseSuccessReviewEsc);
    document.removeEventListener('keydown', onCloseReviewEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onSuccess = () => {
    setReviewIsActive('');
    setReviewSuccessIsActive(' is-active');
    document.removeEventListener('keydown', onCloseReviewEsc);
  };

  const onReviewOverlayClick = () => {
    setReviewIsActive('');
    document.removeEventListener('keydown', onCloseReviewEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onSuccessReviewOverlayClick = () => {
    setReviewSuccessIsActive('');
    document.removeEventListener('keydown', onCloseSuccessReviewEsc);
    document.removeEventListener('keydown', onCloseReviewEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{currentGuitar.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/" aria-disabled>{currentGuitar.name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={`/${currentGuitar.previewImg}`} width="90" height="235" alt={currentGuitar.name}/>
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                {[1, 2, 3, 4, 5].map((idx) => {
                  if (idx > allGuitarsRating[Number(guitarId) - 1] || allGuitarsRating[Number(guitarId) - 1] === 0) {
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
                <span className="rate__count">{currentGuitarComments.length}</span>
                <span className="rate__message"></span>
              </div>
              <div className="tabs">
                <a
                  className={`button button--medium tabs__button${tab === 'Характеристики' ? '' : ' button--black-border'}`}
                  href="#characteristics"
                  onClick={tabClickHandler}
                >
                  Характеристики
                </a>
                <a
                  className={`button button--medium tabs__button${tab === 'Описание' ? '' : ' button--black-border'}`}
                  href="#description"
                  onClick={tabClickHandler}
                >
                  Описание
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className={`tabs__table${tab === 'Характеристики' ? '' : ' hidden'}`}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{currentGuitar.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{currentGuitarType}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{currentGuitar.stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={`tabs__product-description${tab === 'Описание' ? '' : ' hidden'}`}>{currentGuitar.description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{currentGuitar.price} ₽</p><a className="button button--red button--big product-container__button" href="/" onClick={(evt) => evt.preventDefault()}>Добавить в корзину</a>
            </div>
          </div>

          <GuitarPageReviews currentGuitarComments={showedComments} count={count} currentGuitarCommentsLength={currentGuitarComments.length} onShowMoreClick={onShowMoreClick} onSendReviewClick={onSendReviewClick}/>

        </div>
      </main>

      <Footer />

      {reviewIsActive === ' is-active' ? <ModalReview isActive={reviewIsActive} onCloseReviewClick={onCloseReviewClick} currentGuitar={currentGuitar} currentGuitarId={Number(guitarId)} onSuccess={onSuccess} onReviewOverlayClick={onReviewOverlayClick} /> : ''}

      <ModalSuccessReview isActive={reviewSuccessIsActive} onCloseSuccessReviewClick={onCloseSuccessReviewClick} onSuccessReviewOverlayClick={onSuccessReviewOverlayClick} />

    </div>
  );
}

export default GuitarPage;
