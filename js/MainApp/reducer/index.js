/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-24 10:10:10
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/index.js
 */
import {combineReducers} from 'redux';
import popularReducer from './popularReducer';
import themeReducer from './themeReducer';
import trendingReducer from './trendingReducer';
import favoriteReducer from './favoriteReducer';
import languageReducer from './languageReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  popular: popularReducer,
  theme: themeReducer,
  trending: trendingReducer,
  favorite: favoriteReducer,
  language: languageReducer,
  search: searchReducer,
});
