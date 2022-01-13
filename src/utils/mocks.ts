import {datatype, image, name,lorem} from 'faker';
import {FilterPrice, FilterString, FilterType, Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

const sortTitles = [
  'по цене',
  'по популярности',
];

const sortDirections = [
  'По возрастанию',
  'По убыванию',
];

const filterTypes = {
  'acoustic': ['', 'acoustic'],
  'electric': ['', 'electric'],
  'ukulele': ['', 'ukulele'],
};

const filterStrings = {
  '4-strings': ['', '4-strings'],
  '6-strings': ['', '6-strings'],
  '7-strings': ['', '7-strings'],
  '12-strings': ['', '12-strings'],
};

export const makeFakeGuitar = (id: number): Guitar => ({
  "id": id,
  "name": name.title(),
  "vendorCode": lorem.text(),
  "type": lorem.word(),
  "description": lorem.paragraph(),
  "previewImg": image.image(),
  "stringCount": datatype.number(),
  "rating": makeFakeGuitarRating(),
  "price": datatype.number(),
} as Guitar);

export const makeFakeCurrentGuitarComment = (guitarId: number): Comment => ({
  'id': String(datatype.number()),
  'userName': name.title(),
  'advantage': lorem.text(),
  'disadvantage': lorem.text(),
  'comment': lorem.text(),
  'rating': makeFakeGuitarRating(),
  'createAt': lorem.word(),
  'guitarId': guitarId,
} as Comment);

export const makeFakeGuitarRating = (): number => Math.floor(Math.random() * 5);

export const makeFakePage = (): number => Math.ceil(Math.random() * 2);

export const makeFakeCommentsCount = (): number => Math.floor(Math.random() * 15);

export const makeFakeSortTitle = (): string => sortTitles[Math.floor(Math.random() * 1)];

export const makeFakeSortDirection = (): string => sortDirections[Math.floor(Math.random() * 1)];

export const makeFakeFilterPrice = (): FilterPrice => {
  return {
    'priceMin': String(Math.random() * (15000 - 5000) + 5000),
    'priceMax': String(Math.random() * (30000 - 15000) + 15000),
  }
}

export const makeFakeFilterType = (): FilterType => {
  return {
    'acoustic': filterTypes.acoustic[Math.floor(Math.random() * 1)],
    'electric': filterTypes.electric[Math.floor(Math.random() * 1)],
    'ukulele': filterTypes.ukulele[Math.floor(Math.random() * 1)],
  }
}

export const makeFakeFilterString = (): FilterString => {
  return {
    '4-strings': filterStrings['4-strings'][Math.floor(Math.random() * 1)],
    '6-strings': filterStrings['6-strings'][Math.floor(Math.random() * 1)],
    '7-strings': filterStrings['7-strings'][Math.floor(Math.random() * 1)],
    '12-strings': filterStrings['12-strings'][Math.floor(Math.random() * 1)],
  }
}
