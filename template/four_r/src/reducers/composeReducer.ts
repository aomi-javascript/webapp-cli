/**
 *
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/7/5
 */

const DEFAULT_RESET_TYPE = 'clear';

export default (reducer, initialState = {}, resetType?: string) => {
  const resetActionType = resetType || DEFAULT_RESET_TYPE;
  return (state, action) => {
    if (action.type === resetActionType) {
      return initialState;
    }
    return reducer(state, action);
  };
};
