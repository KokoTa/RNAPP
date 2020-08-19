/*
 * @Author: KokoTa
 * @Date: 2020-08-19 09:36:12
 * @LastEditTime: 2020-08-19 10:10:14
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/languageReducer.js
 */
import Type from '../action/type';

const defaultState = [];

const languageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.LANGUAGE_TABS_LOAD_SUCCESS:
      return action.language;
    default:
      return state;
  }
};

export default languageReducer;
