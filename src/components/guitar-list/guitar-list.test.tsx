import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakeGuitarRating} from '../../utils/mocks';
import GuitarList from './guitar-list';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
const guitarsRating = [...new Array(20)].map(() => makeFakeGuitarRating());
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();

describe('Component: GuitarList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        guitars: guitars,
        guitarsRating: [],
      },
      GUITARS_OTHER: {
        commentsCount: commentsCount,
        filterPrice: filterPrice,
        filterType: filterType,
        filterString: filterString,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarList
            guitars={guitars}
            guitarsRating={guitarsRating}
          />
        </Router>
      </Provider>);
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });
});
