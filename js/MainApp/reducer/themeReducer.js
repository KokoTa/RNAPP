/*
 * @Author: KokoTa
 * @Date: 2020-08-12 14:04:17
 * @LastEditTime: 2020-08-14 10:06:53
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/themeReducer.js
 */
import Type from '../action/type';

const defaultState = {
  themeColor: '#1e8bf1',
};

const themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.THEME_CHANGE:
      return {...state, ...action.theme};
  }
  return state;
};

export default themeReducer;
