/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import TestNavigator from './pages/demo/Navigator';
import appNavigator from './js/navigator/AppNavigator';

AppRegistry.registerComponent(appName, () => appNavigator);
