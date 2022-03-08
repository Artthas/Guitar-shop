import {GUITAR_TYPES_EN, GUITAR_TYPES_RU} from '../../const';
import {Guitar} from '../../types/guitar';
import {KeyboardEvent, useRef} from 'react';

type ModalCartParams = {
  isActive: string,
  onCloseCartClick(): void,
  addingGuitar: Guitar,
  onCartOverlayClick(): void,
  onAddToCartClick(): void,
};

function ModalCart({isActive, onCloseCartClick, addingGuitar, onCartOverlayClick, onAddToCartClick}: ModalCartParams): JSX.Element {
  let addingGuitarType;

  if (addingGuitar.type === GUITAR_TYPES_EN.electric) {
    addingGuitarType = GUITAR_TYPES_RU.electric;
  } else if (addingGuitar.type === GUITAR_TYPES_EN.ukulele) {
    addingGuitarType = GUITAR_TYPES_RU.ukulele;
  } else if (addingGuitar.type === GUITAR_TYPES_EN.acoustic) {
    addingGuitarType = GUITAR_TYPES_RU.acoustic;
  }

  const btnCloseRef = useRef<HTMLButtonElement | null>(null);
  const btnAddToCartRef = useRef<HTMLButtonElement | null>(null);

  const onAddToCartKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnCloseRef.current?.focus();
    }
  };

  const onBtnCloseKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnAddToCartRef.current?.focus();
    }
  };

  return (
    <div className={`modal${isActive}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onCartOverlayClick}></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info">
            <img className="modal__img" src={`/${addingGuitar.previewImg}`} width="67" height="137" alt="Честер bass"></img>
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {addingGuitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {addingGuitar.vendorCode}</p>
              <p className="modal__product-params">{addingGuitarType}, {addingGuitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{addingGuitar.price} ₽</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add" onClick={onAddToCartClick} onKeyDown={onAddToCartKeyDown} ref={btnAddToCartRef} autoFocus>Добавить в корзину</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseCartClick} onKeyDown={onBtnCloseKeyDown} ref={btnCloseRef}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCart;
