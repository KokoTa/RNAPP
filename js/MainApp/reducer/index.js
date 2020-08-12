/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-12 15:53:47
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/index.js
 */
import {combineReducers} from 'redux';
import popularReducer from './popularReducer';
import themeReducer from './themeReducer';
import trendingReducer from './trendingReducer';

export default combineReducers({
  popular: popularReducer,
  theme: themeReducer,
  trending: trendingReducer,
});
