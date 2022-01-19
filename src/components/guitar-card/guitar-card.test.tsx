import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakeGuitarRating, makeFakePage} from '../../utils/mocks';
import GuitarCard from './guitar-card';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import Main from '../main/main';
import {AppRoute} from '../../const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const currentGuitar = makeFakeGuitar(1);
const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
const guitarsRating = [...new Array(20)].map(() => makeFakeGuitarRating());
const page = makeFakePage();
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();

const store = mockStore({
  GUITARS: {
    guitars: guitars,
    guitarsRating: guitarsRating,
    currentGuitar: currentGuitar,
    page: page,
    isDataLoaded: true,
  },
  GUITARS_OTHER: {
    commentsCount: commentsCount,
    filterPrice: filterPrice,
    filterType: filterType,
    filterString: filterString,
  },
});

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarCard
            guitar={currentGuitar}
            key={currentGuitar.id}
            commentCount={commentsCount[currentGuitar.id - 1]}
            guitarRating={guitarsRating[currentGuitar.id - 1]}
          />);
        </Router>
      </Provider>);
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });

  it('when user click on component should redirect', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.GuitarPage}>
              <h1>Mock Guitar Page</h1>
            </Route>
            <Route>
              <Main />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );
    expect(screen.queryByText('Mock Guitar Page')).not.toBeInTheDocument();
    const guitarCards = screen.getAllByTestId('product-card');
    for (const card of guitarCards) {
      userEvent.click(card);
      expect(screen.getByText('Mock Guitar Page')).toBeInTheDocument();
    }
  });
});
