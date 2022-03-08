import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar} from '../../utils/mocks';
import GuitarCardInCart from './guitar-card-in-cart';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {AppRoute} from '../../const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const sameGuitarsArray = [...new Array(10)].map((_, idx) => makeFakeGuitar(idx + 1));
const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const guitar = makeFakeGuitar(1);
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const onDeleteClick = jest.fn();

const store = mockStore({
  GUITARS: {
    guitars: guitars,
    isDataLoaded: true,
  },
  GUITARS_OTHER: {
    filterPrice: filterPrice,
    filterType: filterType,
    filterString: filterString,
  },
});

describe('Component: GuitarCardInCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarCardInCart
            guitar={guitar}
            key={guitar.id}
            sameGuitarsArray={sameGuitarsArray}
            onDeleteClick={onDeleteClick}
          />);
        </Router>
      </Provider>);
    expect(screen.getByText(guitar.name)).toBeInTheDocument();
  });

  it('when user click on img should redirect', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.GuitarPage}>
              <h1>Mock Guitar Page</h1>
            </Route>
            <Route>
              <GuitarCardInCart
                guitar={guitar}
                key={guitar.id}
                sameGuitarsArray={sameGuitarsArray}
                onDeleteClick={onDeleteClick}
              />);
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );
    expect(screen.queryByText('Mock Guitar Page')).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('cart-item-img'));
    expect(screen.getByText('Mock Guitar Page')).toBeInTheDocument();
  });
});
