import {GuitarsData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadGuitars, loadCurrentGuitar, loadGuitarsRating, changePage, changeIsDataLoaded, addGuitarInCart, subGuitarInCart, deleteGuitarInCart, changeNumberGuitarsInCart} from '../action';

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
  guitarsInCart: [],
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
    .addCase(addGuitarInCart, (state, action) => {
      const index = state.guitarsInCart.findIndex((guitar) => guitar.id === action.payload.id);
      index !== -1 ? state.guitarsInCart.splice(index, 0, action.payload) : state.guitarsInCart.push(action.payload);
    })
    .addCase(subGuitarInCart, (state, action) => {
      const index = state.guitarsInCart.findIndex((guitar) => action.payload.id === guitar.id);
      state.guitarsInCart.splice(index, 1);
    })
    .addCase(deleteGuitarInCart, (state, action) => {
      state.guitarsInCart = state.guitarsInCart.filter((guitar) => guitar.id !== action.payload.id);
    })
    .addCase(changeNumberGuitarsInCart, (state, action) => {
      const indexInCart = state.guitarsInCart.findIndex((guitar) => guitar.id === action.payload.changingGuitar.id);
      const deletedGuitarsInCart = state.guitarsInCart.filter((guitar) => guitar.id !== action.payload.changingGuitar.id);
      for (let i = action.payload.changingNumber; i > 0; i--) {
        deletedGuitarsInCart.splice(indexInCart, 0, action.payload.changingGuitar);
      }
      state.guitarsInCart = [...deletedGuitarsInCart];
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
