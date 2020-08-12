/*
 * @Author: KokoTa
 * @Date: 2020-08-12 14:03:05
 * @LastEditTime: 2020-08-12 14:03:19
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/theme.js
 */
import Type from './type';

function onThemeSyncChange(theme) {
  return {
    type: Type.THEME_CHANGE,
    theme,
  };
}

export function onThemeChange(theme) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(onThemeSyncChange(theme));
    }, 3000);
  };
}
