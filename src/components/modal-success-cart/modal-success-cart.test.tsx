import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ModalSuccessCart from './modal-success-cart';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const modalIsActive = ' is-active';
const onCloseSuccessCartClick = jest.fn();
const onSuccessCartOverlayClick = jest.fn();

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

describe('Component: ModalSuccessCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessCart
            isActive={modalIsActive}
            onCloseSuccessCartClick={onCloseSuccessCartClick}
            onSuccessCartOverlayClick={onSuccessCartOverlayClick}
          />
        </Router>
      </Provider>);
    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });
});
