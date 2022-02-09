import {GuitarsData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadGuitars, loadCurrentGuitar, loadGuitarsRating, changePage, changeIsDataLoaded} from '../action';

const initialState: GuitarsData = {
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
  guitarsRating: [],
  page: 1,
  isDataLoaded: false,
};

const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadCurrentGuitar, (state, action) => {
      state.currentGuitar = action.payload;
    })
    .addCase(loadGuitarsRating, (state, action) => {
      state.guitarsRating = action.payload;
    })
    .addCase(changePage, (state, action) => {
      state.page = action.payload;
    })
    .addCase(changeIsDataLoaded, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export {guitarsData};
