import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeCurrentGuitarComment} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import GuitarPageReviews from './guitar-page-reviews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const currentGuitarComments = [...new Array(20)].map(() => makeFakeCurrentGuitarComment(1));

describe('Component: GuitarPageReviews', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS_OTHER: {
        currentGuitarComments: currentGuitarComments,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarPageReviews currentGuitarComments={currentGuitarComments} />
        </Router>
      </Provider>);
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
