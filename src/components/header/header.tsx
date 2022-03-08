import {ChangeEvent, FocusEvent, useRef, useState, KeyboardEvent} from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { AppRoute } from '../../const';
import {getGuitars, getGuitarsInCart} from '../../store/guitars-data/selectors';

function Header(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const guitarsInCart = useSelector(getGuitarsInCart);

  const [searchedGuitars, setSearchedGuitars] = useState(guitars);

  const searchListRef = useRef<HTMLUListElement | null>(null);

  const history = useHistory();

  const searchingHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const tempSearchedGuitars = guitars.filter((guitar) => {
      if (evt.target.value.length > 1 && evt.target.value !== ' ') {
        return guitar.name.toLowerCase().indexOf(evt.target.value.toLowerCase()) !== -1;
      } else if (evt.target.value.length === 1 && evt.target.value !== ' ') {
        let i = 0;
        for (const item of guitar.name.toLowerCase()) {
          if (item === ' ') {
            break;
          }
          i++;
        }
        return evt.target.value.toLowerCase() === guitar.name.toLowerCase()[0] || evt.target.value.toLowerCase() === guitar.name.toLowerCase()[i + 1];
      } else {
        return false;
      }
    });
    if (tempSearchedGuitars.length !== 0) {
      searchListRef.current?.classList.remove('hidden');
    } else {
      searchListRef.current?.classList.add('hidden');
    }
    setSearchedGuitars(tempSearchedGuitars);
  };

  const openingSearchListHandler = (evt: FocusEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (evt.target.value !== '') {
      searchListRef.current?.classList.remove('hidden');
    }
  };

  const onSearchedItemKeyDown = (guitarId: number) => (evt: KeyboardEvent<HTMLElement>) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      history.push(`/guitar/${guitarId}`);
    }
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to='/' data-testid="logo">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className="link main-nav__link" to="/">Каталог</Link>
            </li>
            <li><a className="link main-nav__link" href="/" onClick={(evt) => evt.preventDefault()}>Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="/" onClick={(evt) => evt.preventDefault()}>О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?"
              onChange={searchingHandler}
              onFocus={openingSearchListHandler}
              data-testid="search"
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden" ref={searchListRef} data-testid="search-list">
            {searchedGuitars ? searchedGuitars.map((guitar) => <li className="form-search__select-item" data-testid="select-item" tabIndex={0} key={guitar.id} onKeyDown={onSearchedItemKeyDown(guitar.id)} onClick={() => {history.push(`/guitar/${guitar.id}`);}}>{guitar.name}</li>) : ''}
          </ul>
        </div>
        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {guitarsInCart && guitarsInCart.length !== 0 ? <span className="header__cart-count">{guitarsInCart.length}</span> : ''}
        </Link>
      </div>
    </header>
  );
}

export default Header;
