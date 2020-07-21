/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import TestNavigator from './js/BaseDemo/navigator/Navigator';
// import appNavigator from './js/PageDemo/navigator/AppNavigator';

AppRegistry.registerComponent(appName, () => TestNavigator);
// AppRegistry.registerComponent(appName, () => appNavigator);
