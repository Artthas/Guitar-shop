import {Comments} from './comment';

export type Guitar = {
  'id': number,
  'name': string,
  'vendorCode': string,
  'type': string,
  'description': string,
  'previewImg': string,
  'stringCount': number,
  'rating': number,
  'price': number,
  'comments': Comments,
};

export type FilterPrice = {
  'priceMin': string,
  'priceMax': string,
}

export type FilterType = {
  'acoustic': string,
  'electric': string,
  'ukulele': string,
}

export type FilterString = {
  '4-strings': string,
  '6-strings': string,
  '7-strings': string,
  '12-strings': string,
}

export type Coupon = {
  'coupon': string,
}

export type Guitars = Guitar[];
