/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import TestNavigator from './js/BaseDemo/navigator/AppNavigator';
// import AppNavigator from './js/PageDemo/navigator/AppNavigator';
import App from './js/ReduxDemo/App';

// AppRegistry.registerComponent(appName, () => TestNavigator);
// AppRegistry.registerComponent(appName, () => AppNavigator);
AppRegistry.registerComponent(appName, () => App);
