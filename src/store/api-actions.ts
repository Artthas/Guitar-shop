import {ThunkActionResult} from '../types/action';
import {loadCurrentGuitar, loadGuitars, loadCurrentGuitarComments, changeIsDataLoaded, loadDiscount} from './action';
import {APIRoute} from '../const';
import {Guitars, Guitar, Coupon} from '../types/guitar';
import {CommentPost, Comments} from '../types/comment';
import {toast} from 'react-toastify';

type postCommentCbType = () => void;

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>('/guitars?_embed=comments');
      dispatch(loadGuitars(data));
      dispatch(changeIsDataLoaded(true));
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const fetchCurrentGuitarAction = (guitarId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar>(`${APIRoute.Guitars}/${guitarId}`);
      dispatch(loadCurrentGuitar(data));
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const fetchCurrentGuitarCommentsAction = (guitarId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Comments>(`${APIRoute.Guitars}/${guitarId}/${APIRoute.Comments}`);
      dispatch(loadCurrentGuitarComments(data));
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const postCurrentGuitarCommentAction = ({guitarId, userName, advantage, disadvantage, comment, rating}: CommentPost, onSuccess: postCommentCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post<Comments>(`${APIRoute.Comments}`, {guitarId, userName, advantage, disadvantage, comment, rating});
      const {data} = await api.get<Comments>(`${APIRoute.Guitars}/${guitarId}/${APIRoute.Comments}`);
      dispatch(loadCurrentGuitarComments(data));
      onSuccess();
    } catch(error) {
      toast.info('Сервер недоступен');
    }
  };

export const postCouponAction = (coupon: Coupon, onSuccess: postCommentCbType, onError: postCommentCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<number>(`${APIRoute.Coupons}`, coupon);
      dispatch(loadDiscount(data));
      // eslint-disable-next-line no-console
      console.log(data);
      onSuccess();
    } catch(error) {
      onError();
      toast.info('Сервер недоступен');
    }
  };
