import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ModalCart from './modal-cart';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const addingGuitar = makeFakeGuitar(1);
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const modalIsActive = ' is-active';
const onCloseCartClick = jest.fn();
const onCartOverlayClick = jest.fn();
const onAddToCartClick = jest.fn();

const store = mockStore({
  GUITARS: {
    guitars: guitars,
  },
  GUITARS_OTHER: {
    sortTitle: '',
    sortDirection: '',
    filterPrice: filterPrice,
    filterType: filterType,
    filterString: filterString,
  },
});

describe('Component: ModalCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalCart
            isActive={modalIsActive}
            onCloseCartClick={onCloseCartClick}
            addingGuitar={addingGuitar}
            onCartOverlayClick={onCartOverlayClick}
            onAddToCartClick={onAddToCartClick}
          />
        </Router>
      </Provider>);
    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
