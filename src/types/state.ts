import {Guitars, Guitar, FilterPrice, FilterType, FilterString} from '../types/guitar';
import {RootState} from '../store/root-reducer';
import {Comments} from './comment';

export type GuitarsData = {
  guitars: Guitars,
  currentGuitar: Guitar,
  guitarsInCart: Guitars,
  guitarsRating: number[],
  page: number,
  isDataLoaded: boolean,
}

export type GuitarsOtherData = {
  currentGuitarComments: Comments,
  sortTitle: string,
  sortDirection: string,
  filterPrice: FilterPrice,
  filterType: FilterType,
  filterString: FilterString,
  discount: number,
}

export type State = RootState;
