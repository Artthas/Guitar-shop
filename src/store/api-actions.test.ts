import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {makeFakeCoupon, makeFakeCurrentGuitarComment, makeFakeCurrentGuitarCommentPost, makeFakeGuitar} from '../utils/mocks';
import {fetchCurrentGuitarAction, fetchCurrentGuitarCommentsAction, fetchGuitarsAction, postCouponAction, postCurrentGuitarCommentAction} from './api-actions';
import {changeIsDataLoaded, loadCurrentGuitar, loadCurrentGuitarComments, loadGuitars} from './action';

describe('Async actions', () => {
  const fakeChangeIsDataLoaded = jest.fn();
  const api = createAPI(fakeChangeIsDataLoaded());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load_Guitars when GET /guitars', async () => {
    const mockGuitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
    mockAPI
      .onGet('/guitars?_embed=comments')
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
      changeIsDataLoaded(true),
    ]);
  });

  it('should dispatch Load_Current_Guitar when GET /guitars/:guitarId', async () => {
    const mockGuitar = makeFakeGuitar(1);
    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockGuitar.id}`)
      .reply(200, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarAction(String(mockGuitar.id)));

    expect(store.getActions()).toEqual([
      loadCurrentGuitar(mockGuitar),
    ]);
  });

  it('should dispatch Load_Current_Guitar_Comments when GET /guitars/:guitarId/comments', async () => {
    const mockGuitar = makeFakeGuitar(1);
    const currentGuitarComments = [...new Array(20)].map(() => makeFakeCurrentGuitarComment(1));
    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockGuitar.id}/${APIRoute.Comments}`)
      .reply(200, currentGuitarComments);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarCommentsAction(String(mockGuitar.id)));

    expect(store.getActions()).toEqual([
      loadCurrentGuitarComments(currentGuitarComments),
    ]);
  });

  it('should dispatch Load_Current_Guitar_Comments when POST /comments and GET /guitars/:guitarId/comments', async () => {
    const mockGuitar = makeFakeGuitar(1);
    const currentGuitarComments = [...new Array(20)].map(() => makeFakeCurrentGuitarComment(1));
    const currentGuitarCommentPost = makeFakeCurrentGuitarCommentPost(mockGuitar.id);
    const onSuccess = jest.fn();
    mockAPI
      .onPost(`/${APIRoute.Comments}`)
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(postCurrentGuitarCommentAction(currentGuitarCommentPost, onSuccess));

    expect(store.getActions()).toEqual([]);

    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockGuitar.id}/${APIRoute.Comments}`)
      .reply(200, currentGuitarComments);

    await store.dispatch(fetchCurrentGuitarCommentsAction(String(mockGuitar.id)));

    expect(store.getActions()).toEqual([
      loadCurrentGuitarComments(currentGuitarComments),
    ]);
  });

  it('should dispatch Post_Coupon when POST /coupons', async () => {
    const coupon = makeFakeCoupon();
    const onError = jest.fn();
    const onSuccess = jest.fn();
    mockAPI
      .onPost(`/${APIRoute.Coupons}`)
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(postCouponAction(coupon, onSuccess, onError));

    expect(store.getActions()).toEqual([]);
  });
});
