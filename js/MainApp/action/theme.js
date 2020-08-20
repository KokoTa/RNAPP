/*
 * @Author: KokoTa
 * @Date: 2020-08-12 14:03:05
 * @LastEditTime: 2020-08-20 15:23:13
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/theme.js
 */
import Type from './type';
import ThemeColorStore from '../../utils/ThemeColorStore';

export function onLoadThemeColor() {
  return async (dispatch) => {
    const themeColor = await ThemeColorStore.getThemeColor();
    dispatch({
      type: Type.THEME_COLOR_LOAD,
      themeColor,
    });
  };
}

export function onChangeThemeColor(color) {
  return async (dispatch) => {
    const themeColor = await ThemeColorStore.setThemeColor(color);
    dispatch({
      type: Type.THEME_COLOR_CHANGE,
      themeColor,
    });
  };
}
