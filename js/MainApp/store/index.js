/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-18 20:31:29
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/store/index.js
 */
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
