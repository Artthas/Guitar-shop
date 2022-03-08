import Header from '../header/header';
import Footer from '../footer/footer';
import GuitarList from '../guitar-list/guitar-list';
import {useDispatch, useSelector} from 'react-redux';
import {getGuitars, getPage} from '../../store/guitars-data/selectors';
import {getGuitarsRating} from '../../store/guitars-data/selectors';
import {getFilterPrice, getFilterString, getFilterType, getSortDirection, getSortTitle} from '../../store/guitars-other-data/selectors';
import {ChangeEvent, FocusEvent, MouseEvent, useEffect, useState} from 'react';
import {addGuitarInCart, changeFilterPrice, changeFilterString, changeFilterType, changePage, changeSortDirection, changeSortTitle, loadGuitarsRating} from '../../store/action';
import {Link, useHistory, useParams} from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import ModalCart from '../modal-cart/modal-cart';
import ModalSuccessCart from '../modal-success-cart/modal-success-cart';
import {Guitar} from '../../types/guitar';

type FiltersParams = {
  filters: string
};

function Main(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const guitarsRating = useSelector(getGuitarsRating);
  const page = useSelector(getPage);
  const sortTitle = useSelector(getSortTitle);
  const sortDirection = useSelector(getSortDirection);
  const filterPrice = useSelector(getFilterPrice);
  const filterType = useSelector(getFilterType);
  const filterString = useSelector(getFilterString);

  const dispatch = useDispatch();
  const history = useHistory();

  const {filters} = useParams<FiltersParams>();

  useEffect(() => {
    if (filters) {
      if (filters.indexOf('price') !== -1) {
        let priceMin = '';
        let priceMax = '';
        for (const symbol of filters) {
          if (symbol !== '_') {
            if (parseInt(symbol, 10) || symbol === '0') {
              priceMin += symbol;
            }
          } else {
            break;
          }
        }
        for (let j = 0; filters[j] !== '&'; j++) {
          if (filters[j] === '_') {
            for (let i = j; filters[i] !== '&'; i++) {
              if (parseInt(filters[i], 10) || filters[i] === '0') {
                priceMax += filters[i];
              }
            }
            break;
          }
        }
        setPriceMin(priceMin);
        setPriceMax(priceMax);
        dispatch(changeFilterPrice({
          'priceMin': priceMin,
          'priceMax': priceMax,
        }));
      }
      if (filters.indexOf('type') !== -1) {
        dispatch(changeFilterType({
          'acoustic': filters.indexOf('acoustic') !== -1 ? 'acoustic' : '',
          'electric': filters.indexOf('electric') !== -1 ? 'electric' : '',
          'ukulele': filters.indexOf('ukulele') !== -1 ? 'ukulele' : '',
        }));
      }
      if (filters.indexOf('strings') !== -1) {
        dispatch(changeFilterString({
          '4-strings': filters.indexOf('4-strings') !== -1 ? '4-strings' : '',
          '6-strings': filters.indexOf('6-strings') !== -1 ? '6-strings' : '',
          '7-strings': filters.indexOf('7-strings') !== -1 ? '7-strings' : '',
          '12-strings': filters.indexOf('12-strings') !== -1 ? '12-strings' : '',
        }));
      }
    }
  }, [filters, dispatch]);

  const sortedByPriceGuitars = [...guitars];
  sortedByPriceGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);

  const [filteredByPriceGuitars, setFilteredByPriceGuitars] = useState(guitars);
  const [filteredByTypeGuitars, setFilteredByTypeGuitars] = useState(filteredByPriceGuitars);
  const [filteredGuitars, setFilteredGuitars] = useState(filteredByTypeGuitars);
  const [sortedGuitars, setSortedGuitars] = useState(filteredGuitars);
  const [pagedGuitars, setPagedGuitars] = useState(sortedGuitars);
  const [isDisabledString4, setIsDisabledString4] = useState(false);
  const [isDisabledString6, setIsDisabledString6] = useState(false);
  const [isDisabledString7, setIsDisabledString7] = useState(false);
  const [isDisabledString12, setIsDisabledString12] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const [cartIsActive, setCartIsActive] = useState('');
  const [cartSuccessIsActive, setCartSuccessIsActive] = useState('');
  const [addingGuitar, setAddingGuitar] = useState({
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

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const sortTitleHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (evt.currentTarget.textContent) {
      if (sortDirection === '') {
        dispatch(changeSortDirection('По возрастанию'));
      }
      dispatch(changeSortTitle(evt.currentTarget.textContent));
    }
  };

  const sortDirectionHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (evt.currentTarget.ariaLabel) {
      if (sortTitle === '') {
        dispatch(changeSortTitle('по цене'));
      }
      dispatch(changeSortDirection(evt.currentTarget.ariaLabel));
    }
  };

  const priceMinBlurHandler = (evt: FocusEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value !== '') {
      let price = Number(evt.currentTarget.value);
      if (price > sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) {
        price = sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price;
      } else if (price < sortedByPriceGuitars[0].price) {
        price = sortedByPriceGuitars[0].price;
      }
      setPriceMin(String(price));
      dispatch(changeFilterPrice({
        ...filterPrice,
        [evt.currentTarget.id]: String(price),
      }));
    } else {
      dispatch(changeFilterPrice({
        ...filterPrice,
        [evt.currentTarget.id]: '',
      }));
    }
  };

  const priceMaxBlurHandler = (evt: FocusEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value !== '') {
      let price = Number(evt.currentTarget.value);
      if (price > sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) {
        price = sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price;
      } else if (price < sortedByPriceGuitars[0].price) {
        price = sortedByPriceGuitars[0].price;
      }
      setPriceMax(String(price));
      dispatch(changeFilterPrice({
        ...filterPrice,
        [evt.currentTarget.id]: String(price),
      }));
    } else {
      dispatch(changeFilterPrice({
        ...filterPrice,
        [evt.currentTarget.id]: '',
      }));
    }
  };

  const priceMinChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMin(evt.currentTarget.value);
    if (sortedByPriceGuitars[0]) {
      if (Number(evt.currentTarget.value) > sortedByPriceGuitars[0].price) {
        dispatch(changeFilterPrice({
          ...filterPrice,
          [evt.currentTarget.id]: evt.currentTarget.value,
        }));
      }
    }
  };

  const priceMaxChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMax(evt.currentTarget.value);
    if (sortedByPriceGuitars[0]) {
      if (Number(evt.currentTarget.value) > sortedByPriceGuitars[0].price) {
        dispatch(changeFilterPrice({
          ...filterPrice,
          [evt.currentTarget.id]: evt.currentTarget.value,
        }));
      }
    }
  };

  const stringChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterString({
      ...filterString,
      [evt.currentTarget.name]: evt.currentTarget.checked ? evt.currentTarget.name : '',
    }));
  };

  const typeChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterType({
      ...filterType,
      [evt.currentTarget.name]: evt.currentTarget.checked ? evt.currentTarget.name : '',
    }));
    dispatch(changeFilterString({
      '4-strings': evt.currentTarget.name === 'acoustic' ? '' : filterString['4-strings'],
      '6-strings': evt.currentTarget.name === 'ukulele' ? '' : filterString['6-strings'],
      '7-strings': evt.currentTarget.name === 'ukulele' ? '' : filterString['7-strings'],
      '12-strings': evt.currentTarget.name === 'ukulele' || evt.currentTarget.name === 'electric' ? '' : filterString['12-strings'],
    }));
  };

  const pageClickHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setIsPageLoaded(false);
    if (evt.currentTarget.textContent === 'Далее') {
      dispatch(changePage(page + 1));
    } else if (evt.currentTarget.textContent === 'Назад') {
      dispatch(changePage(page - 1));
    } else {
      dispatch(changePage(Number(evt.currentTarget.textContent)));
    }
  };

  useEffect(() => {
    let tempPagedGuitars = [...sortedGuitars];
    const pagesArray = [...new Array(Math.ceil(sortedGuitars.length / 9))].map((_, idx) => idx + 1);
    for (const item of pagesArray) {
      if (page === item) {
        tempPagedGuitars = sortedGuitars.slice(item * 9 - 9, item * 9);
      }
    }
    if (Object.values(filterPrice).join('') !== '' || Object.values(filterType).join('') !== '' || Object.values(filterString).join('') !== '') {
      history.push(`/page-${page}/${Object.values(filterPrice).join('') !== '' ? `price=${Object.values(filterPrice).join('_')}&` : ''}${Object.values(filterType).join('') !== '' ? `type=${Object.values(filterType).join('_')}&` : ''}${Object.values(filterString).join('') !== '' ? `strings=${Object.values(filterString).join('_')}` : ''}`);
    } else {
      history.push(`/page-${page}`);
    }
    setPagedGuitars(tempPagedGuitars);
    setIsPageLoaded(true);
    const tempGuitarsRating = tempPagedGuitars.map((guitar) => guitar.rating);
    dispatch(loadGuitarsRating(tempGuitarsRating));
  }, [sortedGuitars, page, filterPrice, filterType, filterString, history, dispatch]);

  useEffect(() => {
    const tempSortedGuitars = [...filteredGuitars];
    if (sortTitle === 'по популярности' && sortDirection === 'По возрастанию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.rating - guitar2.rating);
    } else if (sortTitle === 'по популярности' && sortDirection === 'По убыванию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar2.rating - guitar1.rating);
    } else if (sortTitle === 'по цене'  && sortDirection === 'По возрастанию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);
    } else if (sortTitle === 'по цене' && sortDirection === 'По убыванию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar2.price - guitar1.price);
    } else if (sortTitle === 'по популярности' && sortDirection === '') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.rating - guitar2.rating);
    } else if (sortTitle === 'по цене'  && sortDirection === '') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);
    } else if (sortTitle === '' && sortDirection === 'По возрастанию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);
    } else if (sortTitle === '' && sortDirection === 'По убыванию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar2.price - guitar1.price);
    }
    setSortedGuitars(tempSortedGuitars);
  }, [filteredGuitars, sortTitle, sortDirection]);

  useEffect(() => {
    let tempFilteredGuitars = [...guitars];
    if (filterPrice.priceMin !== '' && filterPrice.priceMax !== '') {
      tempFilteredGuitars = guitars.filter((guitar) => guitar.price >= Number(filterPrice.priceMin) && guitar.price <= Number(filterPrice.priceMax));
    } else if (filterPrice.priceMin !== '') {
      tempFilteredGuitars = guitars.filter((guitar) => guitar.price >= Number(filterPrice.priceMin));
    } else if (filterPrice.priceMax !== '') {
      tempFilteredGuitars = guitars.filter((guitar) => guitar.price <= Number(filterPrice.priceMax));
    }
    dispatch(changePage(1));
    setFilteredByPriceGuitars(tempFilteredGuitars);
  }, [guitars, filterPrice, dispatch]);

  useEffect(() => {
    let tempFilteredGuitars = [...filteredByPriceGuitars];
    if (filterType.acoustic === '' && filterType.electric === '' && filterType.ukulele === '') {
      setIsDisabledString4(false);
      setIsDisabledString6(false);
      setIsDisabledString7(false);
      setIsDisabledString12(false);
    } else {
      tempFilteredGuitars = filteredByPriceGuitars.filter((guitar) => guitar.type === filterType.acoustic || guitar.type === filterType.electric || guitar.type === filterType.ukulele);
      setIsDisabledString4(filterType.ukulele === '' ? filterType.electric === '' : false);
      setIsDisabledString6(filterType.electric === '' ? filterType.acoustic === '' : false);
      setIsDisabledString7(filterType.electric === '' ? filterType.acoustic === '' : false);
      setIsDisabledString12(filterType.acoustic === '');
    }
    dispatch(changePage(1));
    setFilteredByTypeGuitars(tempFilteredGuitars);
  }, [filteredByPriceGuitars, filterType, dispatch]);

  useEffect(() => {
    let tempFilteredGuitars = [...filteredByTypeGuitars];
    if (!(filterString['4-strings'] === '' && filterString['6-strings'] === '' && filterString['7-strings'] === '' && filterString['12-strings'] === '')) {
      tempFilteredGuitars = filteredByTypeGuitars.filter((guitar) => `${guitar.stringCount}-strings` === filterString['4-strings'] || `${guitar.stringCount}-strings` === filterString['6-strings'] || `${guitar.stringCount}-strings` === filterString['7-strings'] || `${guitar.stringCount}-strings` === filterString['12-strings']);
    }
    dispatch(changePage(1));
    setFilteredGuitars(tempFilteredGuitars);
  }, [filteredByTypeGuitars, filterString, dispatch]);

  const onCloseCartEsc = (evt: KeyboardEvent) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      setCartIsActive('');
      document.removeEventListener('keydown', onCloseCartEsc);
      document.querySelector('body')?.setAttribute('style', 'overflow: visible');
    }
  };

  const onCloseSuccessCartEsc = (evt: KeyboardEvent) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      setCartSuccessIsActive('');
      document.removeEventListener('keydown', onCloseSuccessCartEsc);
      document.querySelector('body')?.setAttribute('style', 'overflow: visible');
    }
  };

  useEffect(() => {
    if (cartSuccessIsActive === '') {
      document.removeEventListener('keydown', onCloseSuccessCartEsc);
    } else {
      document.addEventListener('keydown', onCloseSuccessCartEsc);
    }
  });

  useEffect(() => {
    if (cartIsActive === '') {
      document.removeEventListener('keydown', onCloseCartEsc);
    } else {
      document.addEventListener('keydown', onCloseCartEsc);
    }
  });

  const onBuyClick = (addingGuitarItem: Guitar) => {
    setCartIsActive(' is-active');
    document.querySelector('body')?.setAttribute('style', 'overflow: hidden');
    setAddingGuitar(addingGuitarItem);
  };

  const onCloseCartClick = () => {
    setCartIsActive('');
    document.removeEventListener('keydown', onCloseCartEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onCloseSuccessCartClick = () => {
    setCartSuccessIsActive('');
    document.removeEventListener('keydown', onCloseSuccessCartEsc);
    document.removeEventListener('keydown', onCloseCartEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onAddToCartClick = () => {
    dispatch(addGuitarInCart(addingGuitar));
    setCartIsActive('');
    setCartSuccessIsActive(' is-active');
    document.removeEventListener('keydown', onCloseCartEsc);
  };

  const onCartOverlayClick = () => {
    setCartIsActive('');
    document.removeEventListener('keydown', onCloseCartEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  const onSuccessCartOverlayClick = () => {
    setCartSuccessIsActive('');
    document.removeEventListener('keydown', onCloseSuccessCartEsc);
    document.removeEventListener('keydown', onCloseCartEsc);
    document.querySelector('body')?.setAttribute('style', 'overflow: visible');
  };

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/" aria-disabled>Каталог</Link>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input
                      type="number"
                      placeholder={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[0].price) : ''}
                      id="priceMin"
                      name="от"
                      min={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[0].price) : ''}
                      max={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) : ''}
                      value={priceMin}
                      onBlur={priceMinBlurHandler}
                      onChange={priceMinChangeHandler}
                      data-testid="priceMin"
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input
                      type="number"
                      placeholder={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) : ''}
                      id="priceMax"
                      name="до"
                      min={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[0].price) : ''}
                      max={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) : ''}
                      value={priceMax}
                      onBlur={priceMaxBlurHandler}
                      onChange={priceMaxChangeHandler}
                      data-testid="priceMax"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="acoustic"
                    name="acoustic"
                    onChange={typeChangeHandler}
                    checked={filterType.acoustic !== ''}
                  />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="electric"
                    name="electric"
                    onChange={typeChangeHandler}
                    checked={filterType.electric !== ''}
                  />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="ukulele"
                    name="ukulele"
                    onChange={typeChangeHandler}
                    checked={filterType.ukulele !== ''}
                  />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="4-strings"
                    name="4-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['4-strings'] !== ''}
                    disabled={isDisabledString4}
                  />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="6-strings"
                    name="6-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['6-strings'] !== ''}
                    disabled={isDisabledString6}
                  />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="7-strings"
                    name="7-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['7-strings'] !== ''}
                    disabled={isDisabledString7}
                  />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="12-strings"
                    name="12-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['12-strings'] !== ''}
                    disabled={isDisabledString12}
                  />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className={`catalog-sort__type-button${sortTitle === 'по цене' ? ' catalog-sort__type-button--active' : ''}`} aria-label="по цене" tabIndex={-1} onClick={sortTitleHandler}>по цене</button>
                <button className={`catalog-sort__type-button${sortTitle === 'по популярности' ? ' catalog-sort__type-button--active' : ''}`} aria-label="по популярности" onClick={sortTitleHandler}>по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className={`catalog-sort__order-button catalog-sort__order-button--up${sortDirection === 'По возрастанию' ? ' catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" tabIndex={-1} onClick={sortDirectionHandler}></button>
                <button className={`catalog-sort__order-button catalog-sort__order-button--down${sortDirection === 'По убыванию' ? ' catalog-sort__order-button--active' : ''}`} aria-label="По убыванию" onClick={sortDirectionHandler}></button>
              </div>
            </div>

            {isPageLoaded ? <GuitarList guitars={pagedGuitars} guitarsRating={guitarsRating} onBuyClick={onBuyClick}/> : <LoadingScreen />}

            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                {page === 1 ? '' :
                  <li className="pagination__page pagination__page--prev" id="prev">
                    <a className="link pagination__page-link" href="1" onClick={pageClickHandler}>Назад</a>
                  </li>}
                {[...new Array(Math.ceil(sortedGuitars.length / 9))].map((_, idx) => idx + 1).map((item, idx) =>
                  (
                    <li className={`pagination__page ${page === (idx + 1)  ? 'pagination__page--active' : ''}`} key={item}>
                      <a className="link pagination__page-link" href="1" onClick={pageClickHandler}>{idx + 1}</a>
                    </li>
                  ))}
                {page === Math.ceil(sortedGuitars.length / 9) || Math.ceil(sortedGuitars.length / 9) === 0 ? '' :
                  <li className="pagination__page pagination__page--next" id="next">
                    <a className="link pagination__page-link" href="3" onClick={pageClickHandler}>Далее</a>
                  </li>}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {cartIsActive === ' is-active' ? <ModalCart isActive={cartIsActive} onCloseCartClick={onCloseCartClick} addingGuitar={addingGuitar} onAddToCartClick={onAddToCartClick} onCartOverlayClick={onCartOverlayClick} /> : ''}

      {cartSuccessIsActive === ' is-active' ? <ModalSuccessCart isActive={cartSuccessIsActive} onCloseSuccessCartClick={onCloseSuccessCartClick} onSuccessCartOverlayClick={onSuccessCartOverlayClick} /> : ''}

    </div>
  );
}

export default Main;
