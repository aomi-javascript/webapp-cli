import compose from './composeReducer';
import { navigator as types } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  router: {}
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export default compose((state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case types.navigate:
      const router = {...state.router};
      if (typeof payload === 'string') {
        router[payload] = null;
      } else {
        router[payload.routeName] = payload.params;
      }
      return {
        router
      };
    default:
      return state;
  }
}, DEFAULT_STATE);
