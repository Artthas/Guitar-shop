import {ActionType} from '../types/action';
import {Guitars, Guitar, FilterPrice, FilterType, FilterString} from '../types/guitar';
import {createAction} from '@reduxjs/toolkit';
import {Comments} from '../types/comment';
import { AppRoute } from '../const';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitars) => ({
    payload: guitars,
  }),
);

export const loadCurrentGuitar = createAction(
  ActionType.LoadCurrentGuitar,
  (currentGuitar: Guitar) => ({
    payload: currentGuitar,
  }),
);

export const loadGuitarsRating = createAction(
  ActionType.LoadGuitarsRating,
  (guitarsRating: number[]) => ({
    payload: guitarsRating,
  }),
);

export const changePage = createAction(
  ActionType.ChangePage,
  (page: number) => ({
    payload: page,
  }),
);

export const changeSortTitle = createAction(
  ActionType.ChangeSortTitle,
  (sortTitle: string) => ({
    payload: sortTitle,
  }),
);

export const changeSortDirection = createAction(
  ActionType.ChangeSortDirection,
  (sortDirection: string) => ({
    payload: sortDirection,
  }),
);

export const changeFilterPrice = createAction(
  ActionType.ChangeFilterPrice,
  (filterPrice: FilterPrice) => ({
    payload: filterPrice,
  }),
);

export const changeFilterType = createAction(
  ActionType.ChangeFilterType,
  (filterType: FilterType) => ({
    payload: filterType,
  }),
);

export const changeFilterString = createAction(
  ActionType.ChangeFilterString,
  (filterString: FilterString) => ({
    payload: filterString,
  }),
);

export const loadCurrentGuitarComments = createAction(
  ActionType.LoadCurrentGuitarComments,
  (currentGuitarComments: Comments) => ({
    payload: currentGuitarComments,
  }),
);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const changeIsDataLoaded = createAction(
  ActionType.ChangeIsDataLoaded,
  (isTrue: boolean) => ({
    payload: isTrue,
  }),
);
