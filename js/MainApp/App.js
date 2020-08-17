/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-15 17:05:10
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/App.js
 */
import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store';
import Type from './action/type';
import EventBus from '../utils/EventBus';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator
        onNavigationStateChange={(prevState, currentState) => {
          // 如果跳转到收藏页，就触发该页的数据更新
          const index = currentState.routes[0].index;
          if (index === 2) {
            EventBus.getInstance().fireEvent(Type.FAVORITE_DATA_REFRESH);
          }
        }}
      />
    </Provider>
  );
}
