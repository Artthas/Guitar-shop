import {useRef, KeyboardEvent} from 'react';
import {useHistory} from 'react-router-dom';

type ModalSuccessCartParams = {
  isActive: string,
  onCloseSuccessCartClick(): void,
  onSuccessCartOverlayClick(): void,
};

function ModalSuccessCart({isActive, onCloseSuccessCartClick, onSuccessCartOverlayClick}: ModalSuccessCartParams): JSX.Element {
  const history = useHistory();

  const btnCloseRef = useRef<HTMLButtonElement | null>(null);
  const btnToCartRef = useRef<HTMLButtonElement | null>(null);
  const btnToCatalogRef = useRef<HTMLButtonElement | null>(null);

  const onContinueShoppingKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnCloseRef.current?.focus();
    }
  };

  const onBtnCloseKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnToCartRef.current?.focus();
    }
  };

  const onBtnToCartKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      btnToCatalogRef.current?.focus();
    }
  };

  return (
    <div className={`modal modal--success${isActive}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onSuccessCartOverlayClick}></div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <button
              className="button button--small modal__button"
              onClick={() => {
                onCloseSuccessCartClick();
                history.push('/cart');
              }}
              ref={btnToCartRef}
              onKeyDown={onBtnToCartKeyDown}
            >
              Перейти в корзину
            </button>
            <button className="button button--black-border button--small modal__button modal__button--right" onClick={() => {onCloseSuccessCartClick(); history.push('/');}} onKeyDown={onContinueShoppingKeyDown} ref={btnToCatalogRef} autoFocus>Продолжить покупки</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onCloseSuccessCartClick} onKeyDown={onBtnCloseKeyDown} ref={btnCloseRef}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessCart;
