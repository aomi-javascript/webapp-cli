/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
function create(type: String, actions: Object) {
  const result = {};
  Object.keys(actions).forEach(key => result[key] = `application_types@${type}@${key}`);
  return result;
}

export const navigator: any = create('navigator', {
  navigate: null,
  back: null,
  replace: null,
  reset: null
});

export const root: any = create('root', {
  start: null
});
