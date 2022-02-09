import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Comments} from '../../types/comment';
import {FilterPrice, FilterString, FilterType} from '../../types/guitar';

export const getCurrentGuitarComments = (state: State): Comments => state[NameSpace.GuitarsOther].currentGuitarComments;
export const getSortTitle = (state: State): string => state[NameSpace.GuitarsOther].sortTitle;
export const getSortDirection = (state: State): string => state[NameSpace.GuitarsOther].sortDirection;
export const getFilterPrice = (state: State): FilterPrice => state[NameSpace.GuitarsOther].filterPrice;
export const getFilterType = (state: State): FilterType => state[NameSpace.GuitarsOther].filterType;
export const getFilterString = (state: State): FilterString => state[NameSpace.GuitarsOther].filterString;
