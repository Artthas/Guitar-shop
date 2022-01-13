import {ChangeEvent, FocusEvent, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {getGuitars} from '../../store/guitars-data/selectors';

function Header(): JSX.Element {
  const guitars = useSelector(getGuitars);

  const [searchedGuitars, setSearchedGuitars] = useState(guitars);

  const searchListRef = useRef<HTMLUListElement | null>(null);

  const history = useHistory();

  const searchingHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const tempSearchedGuitars = guitars.filter((guitar) => evt.target.value.length > 0 && evt.target.value !== ' ' ? guitar.name.toLowerCase().indexOf(evt.target.value.toLowerCase()) !== -1 : false);
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

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to='/' data-testid="logo">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link" href="#">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
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
            {searchedGuitars.map((guitar) => <li className="form-search__select-item" data-testid="select-item" tabIndex={0} key={guitar.id} onClick={() => {history.push(`guitars/${guitar.id}`);}}>{guitar.name}</li>)}
          </ul>
        </div>
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
