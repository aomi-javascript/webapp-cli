import compose from './composeReducer';
import { root } from '../constants/ActionTypes';

const DEFAULT_STATE = {};

export default compose((state = DEFAULT_STATE, {type}) => {
  switch (type) {
    case root.start:
      console.log('start reducers');
      return {
        ...state
      };
    default:
      return state;
  }
}, DEFAULT_STATE);
