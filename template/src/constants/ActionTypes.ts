/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
function create<T extends { [key: string]: string }>(type: string, actions: T): T {
  const result: any = {};
  Object.keys(actions).forEach(key => result[key] = `application_types@${type}@${key}`);
  return result;
}

export const navigator: any = create('navigator', {
  navigate: '',
  back: '',
  replace: '',
  reset: ''
});

export const root: any = create('root', {
  start: ''
});
