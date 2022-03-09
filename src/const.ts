export enum AppRoute {
  Root = '/',
  Catalog = '/page-:pageNumber',
  FilteredCatalog = '/page-:pageNumber/:filters',
  GuitarPage = '/guitar/:guitarId',
  Cart = '/cart',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
}

export const MONTHS = [
  'января',
  'февраля',
  'мара',
  'апреля',
  'мая',
  'июня',
  'июля',
  'авгуса',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const GUITAR_TYPES_RU = {
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
  acoustic: 'Акустическая',
};

export const GUITAR_TYPES_EN = {
  electric: 'electric',
  ukulele: 'ukulele',
  acoustic: 'acoustic',
};

export const COUPONS = ['light-333', 'medium-444', 'height-555'];
