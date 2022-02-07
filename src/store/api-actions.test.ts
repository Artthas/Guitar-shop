import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {makeFakeCommentsCount, makeFakeCurrentGuitarComment, makeFakeCurrentGuitarCommentPost, makeFakeGuitar} from '../utils/mocks';
import {fetchCommentsCountAction, fetchCurrentGuitarAction, fetchCurrentGuitarCommentsAction, fetchGuitarsAction, postCurrentGuitarCommentAction} from './api-actions';
import {changeIsDataLoaded, loadCommentsCount, loadCurrentGuitar, loadCurrentGuitarComments, loadGuitars} from './action';

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
      .onGet(APIRoute.Guitars)
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

  it('should dispatch Load_Comments_Count when GET /guitars/:guitarId/comments', async () => {
    const mockGuitars = [...new Array(20)].map((_, idx) => makeFakeGuitar(idx + 1));
    const commentsCount = [...new Array(20)].map(() => makeFakeCommentsCount());
    for (let i = 1; i <= mockGuitars.length; i++) {
      const currentGuitarComments = [...new Array(commentsCount[i - 1])].map(() => makeFakeCurrentGuitarComment(i));
      mockAPI
        .onGet(`${APIRoute.Guitars}/${i}/${APIRoute.Comments}`)
        .reply(200, currentGuitarComments);
    }
    const store = mockStore();
    await store.dispatch(fetchCommentsCountAction(mockGuitars));

    expect(store.getActions()).toEqual([
      loadCommentsCount(commentsCount),
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
});
