/*
 * @Author: KokoTa
 * @Date: 2020-07-20 10:08:01
 * @LastEditTime: 2020-08-05 17:48:02
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/index.js
 */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import TestNavigator from './js/BaseDemo/navigator/AppNavigator';
// import AppNavigator from './js/PageDemo/navigator/AppNavigator';
// import ReduxNavigator from './js/ReduxDemo/App';
import FetchNavigator from './js/FetchDemo/navigator/AppNavigator';

// AppRegistry.registerComponent(appName, () => TestNavigator);
// AppRegistry.registerComponent(appName, () => AppNavigator);
// AppRegistry.registerComponent(appName, () => ReduxNavigator);
AppRegistry.registerComponent(appName, () => FetchNavigator);
