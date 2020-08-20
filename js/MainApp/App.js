/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-20 11:23:33
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
          const prevIndex = prevState.routes[0].index;
          const currentIndex = currentState.routes[0].index;
          // 如果跳转到收藏页，就触发该页的数据更新
          // 收藏页顶部 tab 切换会触发该钩子，但最热页不会，原因见 README
          // console.log(currentState);
          if (currentIndex === 2 && prevIndex !== currentIndex) {
            EventBus.getInstance().fireEvent(Type.FAVORITE_DATA_REFRESH);
          }
        }}
      />
    </Provider>
  );
}
