import {useDispatch} from 'react-redux';
import {GUITAR_TYPES_EN, GUITAR_TYPES_RU} from '../../const';
import {ChangeEvent, FocusEvent, useState} from 'react';
import {Guitar, Guitars} from '../../types/guitar';
import {addGuitarInCart, changeNumberGuitarsInCart, subGuitarInCart} from '../../store/action';
import {useHistory} from 'react-router-dom';

type GuitarCardInCartParams = {
  onDeleteClick(deletingGuitarItem: Guitar): void,
  guitar: Guitar,
  sameGuitarsArray: Guitars,
};

function GuitarCardInCart({onDeleteClick, guitar, sameGuitarsArray}: GuitarCardInCartParams): JSX.Element {
  let guitarType;
  if (guitar.type === GUITAR_TYPES_EN.electric) {
    guitarType = GUITAR_TYPES_RU.electric;
  } else if (guitar.type === GUITAR_TYPES_EN.ukulele) {
    guitarType = GUITAR_TYPES_RU.ukulele;
  } else if (guitar.type === GUITAR_TYPES_EN.acoustic) {
    guitarType = GUITAR_TYPES_RU.acoustic;
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const [guitarNumber, setGuitarNumber] = useState(String(sameGuitarsArray.length));

  const onAddMoreToCartClick = (addingGuitar: Guitar, itemsNumber: number) => {
    if (itemsNumber <= 99) {
      dispatch(addGuitarInCart(addingGuitar));
      setGuitarNumber(String(itemsNumber + 1));
    }
  };

  const onSubLessToCartClick = (subbingGuitar: Guitar, itemsNumber: number) => {
    if (itemsNumber === 1) {
      onDeleteClick(subbingGuitar);
    } else {
      setGuitarNumber(String(itemsNumber - 1));
      dispatch(subGuitarInCart(subbingGuitar));
    }
  };

  const numberGuitarsBlurHandler = (changingGuitar: Guitar) => (evt: FocusEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value !== '') {
      let price = Number(evt.currentTarget.value);
      if (price > 99) {
        price = 99;
      } else if (price < 1) {
        price = 1;
      }
      setGuitarNumber(String(price));
      dispatch(changeNumberGuitarsInCart(changingGuitar, price));
    } else {
      setGuitarNumber('1');
      dispatch(changeNumberGuitarsInCart(changingGuitar, 1));
    }
  };

  const numberGuitarsChangeHandler = (changingGuitar: Guitar) => (evt: ChangeEvent<HTMLInputElement>) => {
    setGuitarNumber(evt.currentTarget.value);
    if (evt.currentTarget.value !== '') {
      let price = Number(evt.currentTarget.value);
      if (price > 99) {
        price = 99;
      } else if (price < 1) {
        price = 1;
      }
      dispatch(changeNumberGuitarsInCart(changingGuitar, price));
    } else {
      dispatch(changeNumberGuitarsInCart(changingGuitar, 1));
    }
  };

  return (
    <div className="cart-item" key={guitar.id} data-testid="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={() => onDeleteClick(guitar)}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span></button>
      <div className="cart-item__image"><img src={guitar.previewImg} width="55" height="130" alt={guitar.name} data-testid="cart-item-img" onClick={() => history.push(`/guitar/${guitar.id}`)}></img></div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{guitarType}, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{guitar.price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={() => onSubLessToCartClick(guitar, sameGuitarsArray.length)}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={guitarNumber} value={guitarNumber} id="4-count" name="4-count" max="99" onChange={numberGuitarsChangeHandler(guitar)} onBlur={numberGuitarsBlurHandler(guitar)}></input>
        <button className="quantity__button" aria-label="Увеличить количество" onClick={() => onAddMoreToCartClick(guitar, sameGuitarsArray.length)}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.price * sameGuitarsArray.length} ₽</div>
    </div>
  );
}

export default GuitarCardInCart;
