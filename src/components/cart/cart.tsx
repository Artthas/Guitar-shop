import Header from '../header/header';
import Footer from '../footer/footer';
import {Link} from 'react-router-dom';
import GuitarListInCart from '../guitar-list-in-cart/guitar-list-in-cart';
import ModalDeleteCart from '../modal-delete-cart/modal-delete-cart';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Coupon, Guitar} from '../../types/guitar';
import {useDispatch, useSelector} from 'react-redux';
import {deleteGuitarInCart} from '../../store/action';
import {getGuitarsInCart} from '../../store/guitars-data/selectors';
import {getDiscount} from '../../store/guitars-other-data/selectors';
import { postCouponAction } from '../../store/api-actions';

function Cart(): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);
  const discount = useSelector(getDiscount);

  let guitarsInCartPrice = 0;

  guitarsInCart.forEach((guitar) => guitarsInCartPrice = guitarsInCartPrice + guitar.price);

  const dispatch = useDispatch();

  const [modalDeleteCartIsActive, setModalDeleteCartIsActive] = useState('');
  const [deletingGuitar, setDeletingGuitar] = useState({
    'id': 0,
    'name': '',
    'vendorCode': '',
    'type': '',
    'description': '',
    'previewImg': '',
    'stringCount': 0,
    'rating': 0,
    'price': 0,
    'comments': [{
      'id': '',
      'userName': '',
      'advantage': '',
      'disadvantage': '',
      'comment': '',
      'rating': 0,
      'createAt': '',
      'guitarId': 0,
    }],
  });
  const [isCouponSuccessed, setIsCouponSuccessed] = useState('');
  const [couponName, setCouponName] = useState({'coupon': ''});
  const [discountPrice, setDiscountPrice] = useState(0);
  const [isSpaceInCoupon, setIsSpaceInCoupon] = useState(false);

  useEffect(() => {
    if (modalDeleteCartIsActive === '') {
      document.removeEventListener('keydown', onCloseModalDeleteCartEsc);
    } else {
      document.addEventListener('keydown', onCloseModalDeleteCartEsc);
    }
  });

  useEffect(() => {
    const price = guitarsInCartPrice * (discount / 100);
    setDiscountPrice(Math.ceil(price));
    if (discount === 15) {
      setCouponName({'coupon': 'light-333'});
    } else if (discount === 25) {
      setCouponName({'coupon': 'medium-444'});
    } else if (discount === 35) {
      setCouponName({'coupon': 'height-555'});
    }
  }, [discount, guitarsInCartPrice]);

  const onDeleteClick = (deletingGuitarItem: Guitar) => {
    setModalDeleteCartIsActive(' is-active');
    document.querySelector('body')?.setAttribute('style', 'overflow: hidden');
    setDeletingGuitar(deletingGuitarItem);
  };

  const onCloseModalDeleteCartClick = () => {
    setModalDeleteCartIsActive('');
    document.removeEventListener('keydown', onCloseModalDeleteCartEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onDeleteConfirmClick = () => {
    dispatch(deleteGuitarInCart(deletingGuitar));
    setModalDeleteCartIsActive('');
    document.removeEventListener('keydown', onCloseModalDeleteCartEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onModalDeleteCartOverlayClick = () => {
    setModalDeleteCartIsActive('');
    document.removeEventListener('keydown', onCloseModalDeleteCartEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onCloseModalDeleteCartEsc = (evt: KeyboardEvent) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      setModalDeleteCartIsActive('');
      document.removeEventListener('keydown', onCloseModalDeleteCartEsc);
      document.querySelector('body')?.setAttribute('style', 'overflow: visible');
    }
  };

  const onSuccess = () => {
    setIsSpaceInCoupon(false);
    setIsCouponSuccessed('successed');
  };

  const onError = () => {
    setIsSpaceInCoupon(false);
    setIsCouponSuccessed('notSuccessed');
  };

  const onSubmit = (coupon: Coupon) => {
    dispatch(postCouponAction(coupon, onSuccess, onError));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isSpace = couponName.coupon.indexOf(' ', 0);
    if (isSpace === -1) {
      onSubmit(couponName);
    } else {
      setIsCouponSuccessed('');
      setIsSpaceInCoupon(true);
    }
  };

  const couponNameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setCouponName({'coupon': evt.target.value});
  };

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/" aria-disabled>Корзина</a>
            </li>
          </ul>
          <div className="cart">

            <GuitarListInCart onDeleteClick={onDeleteClick} />

            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handleSubmit}>
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" data-testid="coupon" value={couponName.coupon} onChange={couponNameHandler}></input>
                    {isCouponSuccessed === 'successed' ? <p className="form-input__message form-input__message--success">Промокод принят</p> : ''}
                    {isCouponSuccessed === 'notSuccessed' ? <p className="form-input__message form-input__message--error">Неверный промокод</p> : ''}
                    {isSpaceInCoupon ? <p className="form-input__message form-input__message--error">Промокод не должен содержать пробелы</p> : ''}
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{guitarsInCartPrice} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value ${discountPrice !== 0 ? 'cart__total-value--bonus' : ''}`}>{discountPrice !== 0 ? '- ' : ''}{discountPrice} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{guitarsInCartPrice - discountPrice} ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {modalDeleteCartIsActive === ' is-active' ? <ModalDeleteCart isActive={modalDeleteCartIsActive} onCloseModalDeleteCartClick={onCloseModalDeleteCartClick} deletingGuitar={deletingGuitar} onDeleteConfirmClick={onDeleteConfirmClick} onModalDeleteCartOverlayClick={onModalDeleteCartOverlayClick} /> : ''}

    </div>
  );
}

export default Cart;
