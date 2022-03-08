import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Guitars, Guitar} from '../../types/guitar';

export const getGuitars = (state: State): Guitars => state[NameSpace.Guitars].guitars;
export const getCurrentGuitar = (state: State): Guitar => state[NameSpace.Guitars].currentGuitar;
export const getGuitarsInCart = (state: State): Guitars => state[NameSpace.Guitars].guitarsInCart;
export const getGuitarsRating = (state: State): number[] => state[NameSpace.Guitars].guitarsRating;
export const getPage = (state: State): number => state[NameSpace.Guitars].page;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Guitars].isDataLoaded;
