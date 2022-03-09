import {guitarsData} from './guitars-data';
import {makeFakeGuitar, makeFakeGuitarRating, makeFakePage} from '../../utils/mocks';
import {loadGuitars, loadCurrentGuitar, loadGuitarsRating, changePage, addGuitarInCart, subGuitarInCart, deleteGuitarInCart, changeNumberGuitarsInCart, changeIsDataLoaded} from '../action';

const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const guitarsInCart = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const currentGuitar = makeFakeGuitar(1);
const guitarsRating = [...new Array(20)].map(() => makeFakeGuitarRating());
const page = makeFakePage();
const addingGuitar = makeFakeGuitar(1);
const subbingGuitar = makeFakeGuitar(1);
const deletingGuitar = makeFakeGuitar(1);
const changingGuitar = makeFakeGuitar(1);
const changingNumber = Math.floor(Math.random() * 5);

describe('Reducer: guitarsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: [],
        guitarsRating: [],
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should update guitars by load guitars', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: [],
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    expect(guitarsData(state, loadGuitars(guitars)))
      .toEqual({
        guitars,
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: [],
        guitarsRating: [],
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should update current guitar by load current guitar', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: [],
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    expect(guitarsData(state, loadCurrentGuitar(currentGuitar)))
      .toEqual({
        guitars: [],
        currentGuitar,
        guitarsInCart: [],
        guitarsRating: [],
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should update guitars rating by load guitars rating', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: [],
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    expect(guitarsData(state, loadGuitarsRating(guitarsRating)))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: [],
        guitarsRating,
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should update page by change page', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: [],
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    expect(guitarsData(state, changePage(page)))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: [],
        guitarsRating: [],
        page,
        isDataLoaded: false,
      });
  });

  it('should update guitar in cart by adding guitar in cart', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: [],
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    expect(guitarsData(state, addGuitarInCart(addingGuitar)))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: [addingGuitar],
        guitarsRating: [],
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should sub guitar in cart by subbing guitar in cart', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: [subbingGuitar],
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    expect(guitarsData(state, subGuitarInCart(subbingGuitar)))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: [],
        guitarsRating: [],
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should delete guitar in cart by deleting guitar in cart', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: guitarsInCart,
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    const newGuitarsInCart = guitarsInCart.filter((guitar) => guitar.id !== deletingGuitar.id);
    expect(guitarsData(state, deleteGuitarInCart(deletingGuitar)))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: newGuitarsInCart,
        guitarsRating: [],
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should change number guitars in cart by changing number guitars in cart', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: guitarsInCart,
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    const indexInCart = guitarsInCart.findIndex((guitar) => guitar.id === changingGuitar.id);
    const deletedGuitarsInCart = guitarsInCart.filter((guitar) => guitar.id !== changingGuitar.id);
    for (let i = changingNumber; i > 0; i--) {
      deletedGuitarsInCart.splice(indexInCart, 0, changingGuitar);
    }
    const newGuitarsInCart = [...deletedGuitarsInCart];
    expect(guitarsData(state, changeNumberGuitarsInCart(changingGuitar, changingNumber)))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: newGuitarsInCart,
        guitarsRating: [],
        page: 1,
        isDataLoaded: false,
      });
  });

  it('should change isDataLoaded by loading data', () => {
    const state = {
      guitars: [],
      currentGuitar: {
        'id': 0,
        'name': '',
        'vendorCode': '',
        'type': '',
        'description': '',
        'previewImg': '',
        'stringCount': 0,
        'rating': 0,
        'price': 0,
        'comments': [],
      },
      guitarsInCart: [],
      guitarsRating: [],
      page: 1,
      isDataLoaded: false,
    };
    expect(guitarsData(state, changeIsDataLoaded(true)))
      .toEqual({
        guitars: [],
        currentGuitar: {
          'id': 0,
          'name': '',
          'vendorCode': '',
          'type': '',
          'description': '',
          'previewImg': '',
          'stringCount': 0,
          'rating': 0,
          'price': 0,
          'comments': [],
        },
        guitarsInCart: [],
        guitarsRating: [],
        page: 1,
        isDataLoaded: true,
      });
  });
});
