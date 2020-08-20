/*
 * @Author: KokoTa
 * @Date: 2020-08-12 14:04:17
 * @LastEditTime: 2020-08-20 15:23:33
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/themeReducer.js
 */
import Type from '../action/type';
import colors from '../static/themeColor.json';

const defaultState = {
  themeColor: colors.Default,
};

const themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.THEME_COLOR_LOAD:
    case Type.THEME_COLOR_CHANGE:
      return {...state, themeColor: action.themeColor};
  }
  return state;
};

export default themeReducer;
