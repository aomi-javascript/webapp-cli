import { ofType } from 'redux-observable';
import { root } from '../constants/ActionTypes';
import { filter } from 'rxjs/operators';

export function start(action$) {
  return action$.pipe(
    ofType(root.start),
    filter(() => {
      console.log('app start.');
      return false;
    })
  );
}
