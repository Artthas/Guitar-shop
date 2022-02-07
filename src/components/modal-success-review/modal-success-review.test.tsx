import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeCommentsCount, makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar, makeFakePage} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ModalSuccessReview from './modal-success-review';

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
const reviewSuccessIsActive = ' is-active';
const onCloseSuccessReviewClick = jest.fn();
const onSuccessReviewOverlayClick = jest.fn();

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

describe('Component: ModalSuccessReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessReview isActive={reviewSuccessIsActive} onCloseSuccessReviewClick={onCloseSuccessReviewClick} onSuccessReviewOverlayClick={onSuccessReviewOverlayClick} />
        </Router>
      </Provider>);
    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
    expect(screen.getByText('К покупкам!')).toBeInTheDocument();
  });
});
