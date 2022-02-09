import GuitarCard from '../guitar-card/guitar-card';
import {Guitars} from '../../types/guitar';

type GuitarListProps = {
  guitars: Guitars,
  guitarsRating: number[],
}

function GuitarList({guitars, guitarsRating}: GuitarListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="cards">
      {guitars.map((guitar, idx) => <GuitarCard guitar={guitar} key={guitar.id} guitarRating={guitarsRating[idx]}/>)}
    </div>
  );
}

export default GuitarList;
