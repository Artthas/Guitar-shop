import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../main/main';
import GuitarPage from '../guitar-page/guitar-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {useSelector} from 'react-redux';
import {getIsDataLoaded} from '../../store/guitars-data/selectors';
import Cart from '../cart/cart';

function App(): JSX.Element {
  const isDataLoaded = useSelector(getIsDataLoaded);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root} component={Main}/>
        <Route exact path={AppRoute.Catalog} component={Main}/>
        <Route exact path={AppRoute.FilteredCatalog} component={Main}/>
        <Route exact path={AppRoute.GuitarPage} component={GuitarPage}/>
        <Route exact path={AppRoute.Cart} component={Cart}/>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
