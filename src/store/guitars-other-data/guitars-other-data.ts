import {GuitarsOtherData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {changeFilterPrice, changeFilterString, changeFilterType, changeSortDirection, changeSortTitle, loadCurrentGuitarComments} from '../action';

const initialState: GuitarsOtherData = {
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

const guitarsOtherData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortTitle, (state, action) => {
      state.sortTitle = action.payload;
    })
    .addCase(changeSortDirection, (state, action) => {
      state.sortDirection = action.payload;
    })
    .addCase(changeFilterPrice, (state, action) => {
      state.filterPrice = action.payload;
    })
    .addCase(changeFilterType, (state, action) => {
      state.filterType = action.payload;
    })
    .addCase(changeFilterString, (state, action) => {
      state.filterString = action.payload;
    })
    .addCase(loadCurrentGuitarComments, (state, action) => {
      state.currentGuitarComments = action.payload;
    });
});

export {guitarsOtherData};
