import {guitarsOtherData} from './guitars-other-data';
import {makeFakeFilterPrice, makeFakeFilterString, makeFakeFilterType, makeFakeSortDirection, makeFakeSortTitle, makeFakeCurrentGuitarComment} from '../../utils/mocks';
import {changeFilterPrice, changeFilterString, changeFilterType, changeSortDirection, changeSortTitle, loadCurrentGuitarComments} from '../action';

const sortTitle = makeFakeSortTitle();
const sortDirection = makeFakeSortDirection();
const filterPrice = makeFakeFilterPrice();
const filterType = makeFakeFilterType();
const filterString = makeFakeFilterString();
const currentGuitarComments = [...new Array(20)].map(() => makeFakeCurrentGuitarComment(1));

describe('Reducer: guitarsOtherData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsOtherData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change sort title by change sort title', () => {
    const state = {
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeSortTitle(sortTitle)))
      .toEqual({
        currentGuitarComments: [],
        sortTitle,
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change sort direction by change sort direction', () => {
    const state = {
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeSortDirection(sortDirection)))
      .toEqual({
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection,
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change filter price by change filter price', () => {
    const state = {
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeFilterPrice(filterPrice)))
      .toEqual({
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice,
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change filter type by change filter type', () => {
    const state = {
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeFilterType(filterType)))
      .toEqual({
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType,
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });

  it('should change filter string by change filter string', () => {
    const state = {
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, changeFilterString(filterString)))
      .toEqual({
        currentGuitarComments: [],
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString,
      });
  });

  it('should load current guitar comments by load current guitar comments', () => {
    const state = {
      currentGuitarComments: [],
      sortTitle: '',
      sortDirection: '',
      filterPrice: {
        'priceMin': '',
        'priceMax': '',
      },
      filterType: {
        'acoustic': '',
        'electric': '',
        'ukulele': '',
      },
      filterString: {
        '4-strings': '',
        '6-strings': '',
        '7-strings': '',
        '12-strings': '',
      },
    };
    expect(guitarsOtherData(state, loadCurrentGuitarComments(currentGuitarComments)))
      .toEqual({
        currentGuitarComments,
        sortTitle: '',
        sortDirection: '',
        filterPrice: {
          'priceMin': '',
          'priceMax': '',
        },
        filterType: {
          'acoustic': '',
          'electric': '',
          'ukulele': '',
        },
        filterString: {
          '4-strings': '',
          '6-strings': '',
          '7-strings': '',
          '12-strings': '',
        },
      });
  });
});
