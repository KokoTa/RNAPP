/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-09-01 10:21:59
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/App.js
 */
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store';
import RNBootSplash from 'react-native-bootsplash';
import codePush from 'react-native-code-push';

export default codePush(function App() {
  let init = async () => {
    // …do multiple async tasks
  };

  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 250});
    });
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
});
