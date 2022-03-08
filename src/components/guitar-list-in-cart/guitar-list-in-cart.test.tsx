import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import GuitarListInCart from './guitar-list-in-cart';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const guitarsInCart = [...new Array(10)].map((_, idx) => makeFakeGuitar(idx + 1));
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const onDeleteClick = jest.fn();

describe('Component: GuitarListInCart', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        guitars: guitars,
        guitarsInCart: guitarsInCart,
      },
      GUITARS_OTHER: {
        filterPrice: filterPrice,
        filterType: filterType,
        filterString: filterString,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarListInCart
            onDeleteClick={onDeleteClick}
          />
        </Router>
      </Provider>,
    );
    const cartItems = screen.getAllByTestId('cart-item');
    for (const item of cartItems) {
      expect(item).toBeInTheDocument();
    }
  });
});
