import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';

export enum ActionType {
  LoadGuitars = 'guitars/loadGuitars',
  LoadCurrentGuitar = 'guitars/loadCurrentGuitar',
  LoadGuitarsRating = 'guitars/loadGuitarsRating',
  ChangePage = 'guitars/changePage',
  ChangeSortTitle = 'guitars/changeSortTitle',
  ChangeSortDirection = 'guitars/changeSortDirection',
  ChangeFilterPrice = 'guitars/changeFilterPrice',
  ChangeFilterType = 'guitars/changeFilterType',
  ChangeFilterString = 'guitars/changeFilterString',
  RedirectToRoute = 'guitars/redirectToRoute',
  LoadCurrentGuitarComments = 'comments/loadCurrentGuitarComments',
  LoadCommentsCount = 'comments/loadCommentsCount',
  ChangeIsDataLoaded = 'guitars/changeIsDataLoaded',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
