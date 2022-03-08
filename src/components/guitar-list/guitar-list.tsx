import GuitarCard from '../guitar-card/guitar-card';
import {Guitar, Guitars} from '../../types/guitar';

type GuitarListProps = {
  guitars: Guitars,
  guitarsRating: number[],
  onBuyClick(addingGuitar: Guitar): void,
}

function GuitarList({guitars, guitarsRating, onBuyClick}: GuitarListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="cards">
      {guitars.map((guitar, idx) => <GuitarCard guitar={guitar} key={guitar.id} guitarRating={guitarsRating[idx]} onBuyClick={onBuyClick}/>)}
    </div>
  );
}

export default GuitarList;
