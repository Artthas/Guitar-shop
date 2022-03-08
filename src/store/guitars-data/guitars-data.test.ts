import {guitarsData} from './guitars-data';
import {makeFakeGuitar, makeFakeGuitarRating, makeFakePage} from '../../utils/mocks';
import {loadGuitars, loadCurrentGuitar, loadGuitarsRating, changePage} from '../action';

const guitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
const currentGuitar = makeFakeGuitar(1);
const guitarsRating = [...new Array(20)].map(() => makeFakeGuitarRating());
const page = makeFakePage();

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
});
