import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeGuitar} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Cart from './cart';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const guitarsInCart = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const discount = Math.floor(Math.random() * 100);

describe('Component: Cart', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        guitarsInCart: guitarsInCart,
      },
      GUITARS_OTHER: {
        discount: discount,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Cart />
        </Router>
      </Provider>);
    expect(screen.getAllByText('Корзина')[0]).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('coupon'), 'light-333');

    expect(screen.getByDisplayValue(/light-333/i)).toBeInTheDocument();
  });
});
