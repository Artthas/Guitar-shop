import {useRef, KeyboardEvent} from 'react';
import {GUITAR_TYPES_EN, GUITAR_TYPES_RU} from '../../const';
import {Guitar} from '../../types/guitar';

type ModalDeleteCartParams = {
  isActive: string,
  onCloseModalDeleteCartClick(): void,
  deletingGuitar: Guitar,
  onModalDeleteCartOverlayClick(): void,
  onDeleteConfirmClick(): void,
};

function ModalDeleteCart({isActive, onCloseModalDeleteCartClick, deletingGuitar, onModalDeleteCartOverlayClick, onDeleteConfirmClick}: ModalDeleteCartParams): JSX.Element {
  let deletingGuitarType;

  if (deletingGuitar.type === GUITAR_TYPES_EN.electric) {
    deletingGuitarType = GUITAR_TYPES_RU.electric;
  } else if (deletingGuitar.type === GUITAR_TYPES_EN.ukulele) {
    deletingGuitarType = GUITAR_TYPES_RU.ukulele;
  } else if (deletingGuitar.type === GUITAR_TYPES_EN.acoustic) {
    deletingGuitarType = GUITAR_TYPES_RU.acoustic;
  }

  const btnCloseRef = useRef<HTMLButtonElement | null>(null);
  const btnDeleteRef = useRef<HTMLButtonElement | null>(null);
  const btnToCatalogRef = useRef<HTMLButtonElement | null>(null);

  const onBtnToCatalogKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnCloseRef.current?.focus();
    }
  };

  const onBtnCloseKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnDeleteRef.current?.focus();
    }
  };

  const onBtnDeleteKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnToCatalogRef.current?.focus();
    }
  };

  return (
    <div className={`modal${isActive}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onModalDeleteCartOverlayClick}></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info"><img className="modal__img" src={deletingGuitar.previewImg} width="67" height="137" alt="Честер bass"></img>
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {deletingGuitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {deletingGuitar.vendorCode}</p>
              <p className="modal__product-params">{deletingGuitarType}, {deletingGuitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{deletingGuitar.price} ₽</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--small modal__button" onClick={onDeleteConfirmClick} autoFocus ref={btnDeleteRef} onKeyDown={onBtnDeleteKeyDown}>Удалить товар</button>
            <button className="button button--black-border button--small modal__button modal__button--right" onClick={onCloseModalDeleteCartClick} ref={btnToCatalogRef} onKeyDown={onBtnToCatalogKeyDown}>Продолжить покупки</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseModalDeleteCartClick} ref={btnCloseRef} onKeyDown={onBtnCloseKeyDown}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteCart;
