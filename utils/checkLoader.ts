/**
 * 如果用户使用自定义的src loader，则删除预定义loader
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/5
 */
export default function checkLoader(common, userCommon) {
  if (!userCommon || !userCommon.customSrcLoader) {
    return;
  }

  Reflect.deleteProperty(userCommon, 'customSrcLoader');
  common.module.rules.splice(0, 2);
}
