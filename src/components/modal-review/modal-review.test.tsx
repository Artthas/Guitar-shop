import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakePage} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ModalReview from './modal-review';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const currentGuitar = makeFakeGuitar(1);
const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
const page = makeFakePage();
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const reviewIsActive = ' is-active';
const onCloseReviewClick = jest.fn();
const onSuccess = jest.fn();
const onReviewOverlayClick = jest.fn();

const store = mockStore({
  GUITARS: {
    guitars: guitars,
    currentGuitar: currentGuitar,
    guitarsRating: [],
    page: page,
  },
  GUITARS_OTHER: {
    commentsCount: commentsCount,
    currentGuitarComments: [],
    sortTitle: '',
    sortDirection: '',
    filterPrice: filterPrice,
    filterType: filterType,
    filterString: filterString,
  },
});

describe('Component: ModalReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalReview isActive={reviewIsActive} onCloseReviewClick={onCloseReviewClick} currentGuitar={currentGuitar} currentGuitarId={currentGuitar.id} onSuccess={onSuccess} onReviewOverlayClick={onReviewOverlayClick} />
        </Router>
      </Provider>);
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('user-name'), 'Alexander');
    userEvent.type(screen.getByTestId('advantages'), 'Cool');

    expect(screen.getByDisplayValue(/Alexander/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Cool/i)).toBeInTheDocument();
  });
});
