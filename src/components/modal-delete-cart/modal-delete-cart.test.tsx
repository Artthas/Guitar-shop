import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeGuitar} from '../../utils/mocks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ModalDeleteCart from './modal-delete-cart';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const deletingGuitar = makeFakeGuitar(1);
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const modalIsActive = ' is-active';
const onCloseModalDeleteCartClick = jest.fn();
const onModalDeleteCartOverlayClick = jest.fn();
const onDeleteConfirmClick = jest.fn();

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

describe('Component: ModalDeleteCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalDeleteCart
            isActive={modalIsActive}
            onCloseModalDeleteCartClick={onCloseModalDeleteCartClick}
            deletingGuitar={deletingGuitar}
            onModalDeleteCartOverlayClick={onModalDeleteCartOverlayClick}
            onDeleteConfirmClick={onDeleteConfirmClick}
          />
        </Router>
      </Provider>);
    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
