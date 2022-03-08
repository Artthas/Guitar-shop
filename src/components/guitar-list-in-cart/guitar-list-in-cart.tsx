import {getGuitarsInCart} from '../../store/guitars-data/selectors';
import {useSelector} from 'react-redux';
import React from 'react';
import {Guitar} from '../../types/guitar';
import GuitarCardInCart from '../guitar-card-in-cart/guitar-card-in-cart';

type GuitarListInCartParams = {
  onDeleteClick(deletingGuitarItem: Guitar): void,
};

function GuitarListInCart({onDeleteClick}: GuitarListInCartParams): JSX.Element {
  const guitarsInCart = useSelector(getGuitarsInCart);

  const idGuitarsInCart = guitarsInCart.map((guitar) => guitar.id);

  const idGuitarsInCartSet = new Set(idGuitarsInCart);
  const idGuitarsInCartArray = Array.from(idGuitarsInCartSet);

  const guitarsInCartArray = idGuitarsInCartArray.map((id) => guitarsInCart.find((guitar) => id === guitar.id));

  return (
    <React.Fragment>
      {guitarsInCartArray.map((guitar) => guitar ? <GuitarCardInCart key={guitar.id} onDeleteClick={onDeleteClick} guitar={guitar} sameGuitarsArray={guitarsInCart.filter((guitarItem) => guitarItem.id === guitar.id)} /> : '')}
    </React.Fragment>
  );
}

export default GuitarListInCart;
