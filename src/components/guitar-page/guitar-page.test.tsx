import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeCurrentGuitarComment, makeFakeGuitar, makeFakeGuitarRating} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import GuitarPage from './guitar-page';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const guitarsRating = [...new Array(20)].map(() => makeFakeGuitarRating());
const currentGuitar = makeFakeGuitar(1);
const currentGuitarComments = [...new Array(20)].map(() => makeFakeCurrentGuitarComment(1));

describe('Component: GuitarPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {
        guitars: guitars,
        currentGuitar: currentGuitar,
        guitarsRating: guitarsRating,
      },
      GUITARS_OTHER: {
        currentGuitarComments: currentGuitarComments,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarPage />
        </Router>
      </Provider>);
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
});
