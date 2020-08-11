/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-10 19:10:24
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/index.js
 */
import {combineReducers} from 'redux';
import popularReducer from './popularReducer';

export default combineReducers({
  popular: popularReducer,
});
