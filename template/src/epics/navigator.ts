import { ofType } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { goBack, push, replace as replaceAction } from 'connected-react-router';
import { navigator as types } from '../constants/ActionTypes';
import { getState } from '../core/store';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export function navigate(action$) {
  return action$.pipe(
    ofType(types.navigate),
    // 过滤同一个路径
    filter(({payload}) => {
      const {pathname} = getState().router.location;
      if (typeof payload === 'string') {
        return payload[0] !== pathname;
      }
      const {routeName} = payload;
      return routeName !== pathname;
    }),
    map(({payload}) => {
      if (typeof payload === 'string') {
        return push(payload || '');
      }
      return push(payload.routeName);
    })
  );
}

export function reset(action$) {
  return action$.pipe(
    ofType(types.reset),
    map(({payload}) => ({type: types.replace, payload}))
  );
}

export function replace(action$) {
  return action$.pipe(
    ofType(types.replace),
    map(({payload}) => replaceAction(payload || ''))
  );
}

export function back(action$) {
  return action$.pipe(
    ofType(types.back),
    map(() => goBack())
  );
}
